'use client';

import Link from 'next/link';
import { useState, useMemo } from 'react';
import CalculatorLayout from '@/components/CalculatorLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { calculateCapitalGainsTax, formatCurrency, formatPercent, type FilingStatus } from '@/lib/calculators';

export default function CapitalGainsPage() {
  const [purchasePrice, setPurchasePrice] = useState('10000');
  const [salePrice, setSalePrice] = useState('18000');
  const [holdingPeriod, setHoldingPeriod] = useState('long');
  const [ordinaryIncome, setOrdinaryIncome] = useState('60000');
  const [filingStatus, setFilingStatus] = useState<FilingStatus>('single');

  const results = useMemo(() => {
    const gains = Number(salePrice) - Number(purchasePrice);
    if (gains <= 0) return { gains, tax: 0, rate: 0, netProceeds: Number(salePrice), gain: gains };

    const { tax, rate } = calculateCapitalGainsTax(gains, holdingPeriod === 'long', Number(ordinaryIncome), filingStatus);
    const netProceeds = Number(salePrice) - tax;

    return { gains, tax, rate, netProceeds, gain: gains };
  }, [purchasePrice, salePrice, holdingPeriod, ordinaryIncome, filingStatus]);

  return (
    <CalculatorLayout
      title="Capital Gains Tax Calculator"
      description="Estimate the tax owed on profits from selling investments, property, or other assets."
      category="Tax"
    >
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader><CardTitle className="text-base">Sale Details (2026)</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div><Label>Purchase Price ($)</Label><Input type="number" value={purchasePrice} onChange={(e) => setPurchasePrice(e.target.value)} min="0" /></div>
              <div><Label>Sale Price ($)</Label><Input type="number" value={salePrice} onChange={(e) => setSalePrice(e.target.value)} min="0" /></div>
              <div>
                <Label>Holding Period</Label>
                <Select value={holdingPeriod} onValueChange={(v) => v != null && setHoldingPeriod(v)}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="short">Short-term (≤ 1 year)</SelectItem>
                    <SelectItem value="long">Long-term (&gt; 1 year)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Separator />
              <div><Label>Other Income Before Deductions ($)</Label><Input type="number" value={ordinaryIncome} onChange={(e) => setOrdinaryIncome(e.target.value)} min="0" /></div>
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
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-3">
          {results !== null ? (
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base">Capital Gains Summary</CardTitle>
                  <Badge variant={holdingPeriod === 'long' ? 'default' : 'secondary'}>
                    {holdingPeriod === 'long' ? 'Long-term' : 'Short-term'}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wide">Capital Gain / Loss</p>
                    <p className={`text-2xl font-bold ${results.gains >= 0 ? 'text-primary' : 'text-destructive'}`}>
                      {results.gains >= 0 ? '+' : ''}{formatCurrency(results.gains)}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wide">Effective Rate</p>
                    <p className="text-2xl font-bold">{formatPercent(results.rate, 1)}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wide">Tax Owed</p>
                    <p className="text-2xl font-bold text-destructive">{formatCurrency(results.tax)}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wide">Net Proceeds</p>
                    <p className="text-2xl font-bold text-primary">{formatCurrency(results.netProceeds)}</p>
                  </div>
                </div>

                <Separator className="my-4" />

                <div className="text-sm space-y-2">
                  <p className="font-medium">2026 Long-term Capital Gains Rates (Single, by taxable income):</p>
                  <div className="space-y-1 text-muted-foreground">
                    <div className="flex justify-between"><span>0%</span><span>Income up to $49,450</span></div>
                    <div className="flex justify-between"><span>15%</span><span>$49,450 – $545,500</span></div>
                    <div className="flex justify-between"><span>20%</span><span>Over $545,500</span></div>
                  </div>
                </div>

                {holdingPeriod === 'short' && (
                  <div className="mt-4 p-3 bg-amber-500/10 rounded-lg text-sm text-amber-600 dark:text-amber-400">
                    Short-term gains are taxed as ordinary income. Holding assets for more than 1 year qualifies for lower long-term rates.
                  </div>
                )}
              </CardContent>
            </Card>
          ) : (
            <Card><CardContent className="py-12 text-center text-muted-foreground">Enter sale details to calculate tax.</CardContent></Card>
          )}
        </div>
      </div>

      <div className="mt-12 space-y-6">
        <Card>
          <CardHeader><CardTitle>How Capital Gains Tax Is Calculated</CardTitle></CardHeader>
          <CardContent className="space-y-4 text-sm">
            <div>
              <h3 className="font-semibold mb-2">Short-Term vs. Long-Term</h3>
              <p className="text-muted-foreground">Calculates capital gains tax on investment profits using short-term (ordinary income rates) or long-term (preferential rates) rates.</p>
              <p className="font-mono text-xs bg-muted p-3 rounded mt-2 overflow-x-auto">Long-term: the gain is stacked on top of your taxable income and taxed at 0%, 15%, or 20% depending on which brackets it falls in</p>
            </div>

            <Separator />

            <div>
              <h3 className="font-semibold mb-2">Example: Selling Stock After Two Years</h3>
              <p className="text-muted-foreground">You sell stock bought for $50,000 and held 2+ years for $75,000, long-term rate 15%:</p>
              <ul className="list-disc list-inside text-muted-foreground mt-2 space-y-1">
                <li>Sale price: $75,000</li>
                <li>Cost basis: $50,000</li>
                <li>Capital gain: $25,000</li>
                <li><strong>Tax owed (15%): $3,750</strong></li>
                <li>Net profit: $21,250</li>
              </ul>
            </div>

            <Separator />

            <div>
              <h3 className="font-semibold mb-2">Capital Gains Questions</h3>
              <div className="space-y-3">
                <div>
                  <p className="font-medium text-sm">What&apos;s the difference between short and long-term gains?</p>
                  <p className="text-muted-foreground text-sm">Short-term (held &lt;1 year): taxed as ordinary income (up to 37%). Long-term (held &gt;1 year): 0%, 15%, or 20% depending on income. Hold longer to save big on taxes.</p>
                </div>
                <div>
                  <p className="font-medium text-sm">Can I offset gains with losses?</p>
                  <p className="text-muted-foreground text-sm">Yes. Harvest losses to offset gains (tax-loss harvesting). You can carry unused losses forward to future years.</p>
                </div>
                <div>
                  <p className="font-medium text-sm">What about state taxes?</p>
                  <p className="text-muted-foreground text-sm">This shows federal only. Most states tax capital gains as ordinary income (3–13.3%); about 8 states have no capital gains tax.</p>
                </div>
              </div>
            </div>

            <Separator />

            <div>
              <h3 className="font-semibold mb-2">Tax-Smart Selling</h3>
              <ul className="list-disc list-inside text-muted-foreground space-y-1">
                <li>Hold investments 1+ year for long-term rates (15% vs. 37% short-term)—massive tax savings.</li>
                <li>Tax-loss harvesting (selling losers to offset winners) can save thousands annually.</li>
                <li>In tax-advantaged accounts (401k, IRA), gains aren&apos;t taxed until withdrawal—keep long-term winners there.</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Why Holding Longer and Your Income Both Matter</CardTitle></CardHeader>
          <CardContent className="space-y-4 text-sm">
            <p className="text-muted-foreground">A single filer with a $60,000 salary sells an investment for a $20,000 profit. Using 2026 brackets and the standard deduction:</p>
              <div className="overflow-x-auto rounded-lg border border-border/60">
                <table className="w-full text-sm">
                  <thead className="bg-muted/40">
                    <tr><th className="px-3 py-2 text-left font-semibold"></th><th className="px-3 py-2 text-left font-semibold">Held 1 year or less</th><th className="px-3 py-2 text-left font-semibold">Held more than 1 year</th></tr>
                  </thead>
                  <tbody>
                    <tr className="border-t border-border/60"><td className="px-3 py-2 tabular-nums">How it is taxed</td><td className="px-3 py-2 tabular-nums">As ordinary income</td><td className="px-3 py-2 tabular-nums">Long-term capital gains rates</td></tr>
                    <tr className="border-t border-border/60"><td className="px-3 py-2 tabular-nums">Federal tax on the gain</td><td className="px-3 py-2 tabular-nums">$3,750</td><td className="px-3 py-2 tabular-nums">$2,167.50</td></tr>
                    <tr className="border-t border-border/60"><td className="px-3 py-2 tabular-nums">Effective rate on the gain</td><td className="px-3 py-2 tabular-nums">18.8%</td><td className="px-3 py-2 tabular-nums">10.8%</td></tr>
                  </tbody>
                </table>
              </div>
            <p className="text-muted-foreground">Their taxable salary is $43,900 after the $16,100 standard deduction. The 0% long-term bracket for single filers runs to $49,450 of taxable income, so the first $5,550 of the gain is taxed at 0% and the remaining $14,450 at 15%. Waiting past the one-year mark saves $1,582.50 here.</p>
            <p className="text-muted-foreground">This is also why the same gain can cost very different amounts in different years: realizing gains in a lower-income year, such as early retirement or a career break, can push more of them into the 0% band. Higher earners may also owe the 3.8% net investment income tax, which this calculator does not include.</p>
            <Separator />
            <div>
              <h3 className="font-semibold mb-2">Related Guides</h3>
              <ul className="list-disc list-inside text-muted-foreground space-y-1">
                <li><Link href="/blog/how-tax-brackets-work-2026" className="text-primary underline">How tax brackets really work in 2026</Link></li>
                <li><Link href="/blog/how-compound-growth-builds-wealth" className="text-primary underline">How compound growth builds wealth</Link></li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </CalculatorLayout>
  );
}
