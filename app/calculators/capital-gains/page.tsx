'use client';

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
            <CardHeader><CardTitle className="text-base">Sale Details (2024)</CardTitle></CardHeader>
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
              <div><Label>Other Ordinary Income ($)</Label><Input type="number" value={ordinaryIncome} onChange={(e) => setOrdinaryIncome(e.target.value)} min="0" /></div>
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
                    <p className="text-xs text-muted-foreground uppercase tracking-wide">Tax Rate</p>
                    <p className="text-2xl font-bold">{formatPercent(results.rate, 0)}</p>
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
                  <p className="font-medium">2024 Long-term Capital Gains Rates (Single):</p>
                  <div className="space-y-1 text-muted-foreground">
                    <div className="flex justify-between"><span>0%</span><span>Income up to $47,025</span></div>
                    <div className="flex justify-between"><span>15%</span><span>$47,025 – $518,900</span></div>
                    <div className="flex justify-between"><span>20%</span><span>Over $518,900</span></div>
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
    </CalculatorLayout>
  );
}
