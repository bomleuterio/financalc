'use client';

import { useState, useMemo } from 'react';
import CalculatorLayout from '@/components/CalculatorLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { formatCurrency, formatPercent } from '@/lib/calculators';

export default function ROIPage() {
  const [initialInvestment, setInitialInvestment] = useState('10000');
  const [finalValue, setFinalValue] = useState('14500');
  const [years, setYears] = useState('3');
  const [additionalCosts, setAdditionalCosts] = useState('0');

  const results = useMemo(() => {
    const initial = Number(initialInvestment);
    const final = Number(finalValue);
    const yrs = Number(years);
    const costs = Number(additionalCosts);
    if (initial <= 0) return null;

    const totalInvested = initial + costs;
    const netProfit = final - totalInvested;
    const roi = (netProfit / totalInvested) * 100;
    const annualizedROI = yrs > 0 ? (Math.pow(final / totalInvested, 1 / yrs) - 1) * 100 : null;

    return { totalInvested, netProfit, roi, annualizedROI, final };
  }, [initialInvestment, finalValue, years, additionalCosts]);

  return (
    <CalculatorLayout
      title="ROI Calculator"
      description="Calculate your return on investment and annualized rate of return."
      category="Investment"
    >
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader><CardTitle className="text-base">Investment Details</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Initial Investment ($)</Label>
                <Input type="number" value={initialInvestment} onChange={(e) => setInitialInvestment(e.target.value)} min="0" />
              </div>
              <div>
                <Label>Additional Costs ($)</Label>
                <Input type="number" value={additionalCosts} onChange={(e) => setAdditionalCosts(e.target.value)} min="0" />
                <p className="text-xs text-muted-foreground mt-1">Fees, commissions, maintenance, etc.</p>
              </div>
              <div>
                <Label>Final Value ($)</Label>
                <Input type="number" value={finalValue} onChange={(e) => setFinalValue(e.target.value)} min="0" />
              </div>
              <div>
                <Label>Investment Period (years)</Label>
                <Input type="number" step="0.5" value={years} onChange={(e) => setYears(e.target.value)} min="0.1" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-3">
          {results ? (
            <Card>
              <CardHeader><CardTitle className="text-base">ROI Results</CardTitle></CardHeader>
              <CardContent>
                <div className="flex items-baseline gap-3 mb-1">
                  <p className="text-5xl font-bold text-primary">{formatPercent(results.roi, 2)}</p>
                  <span className="text-lg text-muted-foreground">total ROI</span>
                </div>
                {results.annualizedROI !== null && (
                  <p className="text-xl font-semibold mt-1">
                    <span className="text-muted-foreground text-base">Annualized: </span>
                    <span className={results.annualizedROI >= 0 ? 'text-primary' : 'text-destructive'}>
                      {formatPercent(results.annualizedROI, 2)}
                    </span>
                    <span className="text-sm text-muted-foreground"> / year</span>
                  </p>
                )}

                <Separator className="my-4" />

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wide">Total Invested</p>
                    <p className="text-lg font-semibold">{formatCurrency(results.totalInvested)}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wide">Final Value</p>
                    <p className="text-lg font-semibold">{formatCurrency(results.final)}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wide">Net Profit / Loss</p>
                    <p className={`text-lg font-semibold ${results.netProfit >= 0 ? 'text-primary' : 'text-destructive'}`}>
                      {results.netProfit >= 0 ? '+' : ''}{formatCurrency(results.netProfit)}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wide">Period</p>
                    <p className="text-lg font-semibold">{years} years</p>
                  </div>
                </div>

                <div className="mt-4">
                  <Badge variant={results.roi >= 0 ? 'default' : 'destructive'}>
                    {results.roi >= 0 ? '▲ Profit' : '▼ Loss'}
                  </Badge>
                  {results.annualizedROI !== null && results.annualizedROI > 7 && (
                    <Badge variant="secondary" className="ml-2">Beats S&P 500 avg</Badge>
                  )}
                </div>

                <Separator className="my-4" />
                <div className="text-sm text-muted-foreground space-y-1">
                  <p><strong>S&P 500 historical avg:</strong> ~10% / year</p>
                  <p><strong>Inflation avg:</strong> ~3% / year</p>
                  <p><strong>Real return:</strong> {results.annualizedROI !== null ? formatPercent(results.annualizedROI - 3, 2) + ' / year' : '—'}</p>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="py-12 text-center text-muted-foreground">
                Enter investment details to calculate ROI.
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      <div className="mt-12 space-y-6">
        <Card>
          <CardHeader><CardTitle>How This ROI Calculator Works</CardTitle></CardHeader>
          <CardContent className="space-y-4 text-sm">
            <div>
              <h3 className="font-semibold mb-2">Formula</h3>
              <p className="text-muted-foreground">ROI measures the profit or loss from an investment as a percentage of the amount invested.</p>
              <p className="font-mono text-xs bg-muted p-3 rounded mt-2 overflow-x-auto">ROI (%) = (Final Value - Initial Investment) / Initial Investment × 100</p>
              <p className="text-muted-foreground mt-2 text-xs">Annualized ROI accounts for the holding period and expresses annual returns.</p>
            </div>

            <Separator />

            <div>
              <h3 className="font-semibold mb-2">Worked Example</h3>
              <p className="text-muted-foreground">You invest $10,000 in a stock that grows to $14,000 over 3 years:</p>
              <ul className="list-disc list-inside text-muted-foreground mt-2 space-y-1">
                <li>Initial investment: $10,000</li>
                <li>Final value: $14,000</li>
                <li>Net profit: $4,000</li>
                <li>Total ROI: 40%</li>
                <li>Annualized ROI: 11.9% per year</li>
              </ul>
            </div>

            <Separator />

            <div>
              <h3 className="font-semibold mb-2">Common Questions</h3>
              <div className="space-y-3">
                <div>
                  <p className="font-medium text-sm">What&apos;s a good ROI?</p>
                  <p className="text-muted-foreground text-sm">S&P 500 historically averages ~10% annually. Returns above 10% beat the market; below 7% underperform inflation. Compare your ROI to a benchmark like the S&P 500, not just raw percentage.</p>
                </div>
                <div>
                  <p className="font-medium text-sm">How do I account for fees and taxes?</p>
                  <p className="text-muted-foreground text-sm">This calculator shows gross returns. Subtract fees, commissions, and taxes (capital gains) to get your true net ROI. For example, a 10% return minus 20% capital gains tax is really 8%.</p>
                </div>
                <div>
                  <p className="font-medium text-sm">Is annualized ROI the same as average annual return?</p>
                  <p className="text-muted-foreground text-sm">No. Annualized ROI accounts for compounding. A 40% gain over 3 years is 11.9% annualized, not 13.3% (which would be simple division).</p>
                </div>
              </div>
            </div>

            <Separator />

            <div>
              <h3 className="font-semibold mb-2">Key Takeaways</h3>
              <ul className="list-disc list-inside text-muted-foreground space-y-1">
                <li>Always annualize ROI to compare investments held for different periods.</li>
                <li>Account for fees and taxes—they can reduce your net return by 2–5% annually.</li>
                <li>Use ROI to evaluate stock picks, real estate, or any investment against market benchmarks.</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </CalculatorLayout>
  );
}
