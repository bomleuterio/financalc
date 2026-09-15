'use client';

import { useState, useMemo } from 'react';
import CalculatorLayout from '@/components/CalculatorLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { formatCurrency, formatPercent } from '@/lib/calculators';

const US_STATE_RATES: Record<string, number> = {
  AL: 4.0, AK: 0, AZ: 5.6, AR: 6.5, CA: 7.25, CO: 2.9, CT: 6.35, DE: 0, FL: 6.0, GA: 4.0,
  HI: 4.0, ID: 6.0, IL: 6.25, IN: 7.0, IA: 6.0, KS: 6.5, KY: 6.0, LA: 4.45, ME: 5.5, MD: 6.0,
  MA: 6.25, MI: 6.0, MN: 6.875, MS: 7.0, MO: 4.225, MT: 0, NE: 5.5, NV: 6.85, NH: 0, NJ: 6.625,
  NM: 4.875, NY: 4.0, NC: 4.75, ND: 5.0, OH: 5.75, OK: 4.5, OR: 0, PA: 6.0, RI: 7.0, SC: 6.0,
  SD: 4.5, TN: 7.0, TX: 6.25, UT: 4.85, VT: 6.0, VA: 4.3, WA: 6.5, WV: 6.0, WI: 5.0, WY: 4.0, DC: 6.0,
};

export default function SalesTaxPage() {
  const [price, setPrice] = useState('100');
  const [taxRate, setTaxRate] = useState('8.5');
  const [quantity, setQuantity] = useState('1');

  const results = useMemo(() => {
    const p = Number(price) * Number(quantity);
    const r = Number(taxRate) / 100;
    const tax = p * r;
    const total = p + tax;
    const reverseTax = p / (1 + r) * r;
    return { preTax: p, tax, total, reverseTax, reversePreTax: p / (1 + r) };
  }, [price, taxRate, quantity]);

  const sortedStates = Object.entries(US_STATE_RATES)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10);

  return (
    <CalculatorLayout title="Sales Tax Calculator" description="Calculate sales tax on any purchase. Includes all 50 US state rates for reference." category="Tax">
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <Card>
            <CardHeader><CardTitle className="text-base">Purchase Details</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div><Label>Pre-tax Price ($)</Label><Input type="number" step="0.01" value={price} onChange={(e) => setPrice(e.target.value)} min="0" /></div>
              <div><Label>Quantity</Label><Input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} min="1" /></div>
              <div>
                <Label>Tax Rate (%)</Label>
                <Input type="number" step="0.01" value={taxRate} onChange={(e) => setTaxRate(e.target.value)} min="0" max="20" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle className="text-base">State Tax Rates (Top 10)</CardTitle></CardHeader>
            <CardContent>
              <div className="space-y-1.5">
                {sortedStates.map(([state, rate]) => (
                  <button
                    key={state}
                    onClick={() => setTaxRate(String(rate))}
                    className="w-full flex justify-between text-sm px-2 py-1 rounded hover:bg-muted transition-colors"
                  >
                    <span className="text-muted-foreground">{state}</span>
                    <span className="font-medium">{rate}%</span>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-3">
          <Card>
            <CardHeader><CardTitle className="text-base">Sales Tax Breakdown</CardTitle></CardHeader>
            <CardContent>
              <p className="text-4xl font-bold text-primary">{formatCurrency(results.total, 2)}</p>
              <p className="text-sm text-muted-foreground mt-1">total with tax</p>
              <Separator className="my-4" />
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Pre-tax amount</span>
                  <span className="font-medium">{formatCurrency(results.preTax, 2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Sales tax ({taxRate}%)</span>
                  <span className="font-medium">{formatCurrency(results.tax, 2)}</span>
                </div>
                <Separator />
                <div className="flex justify-between font-semibold">
                  <span>Total</span>
                  <span>{formatCurrency(results.total, 2)}</span>
                </div>
              </div>
              <Separator className="my-4" />
              <div>
                <p className="text-sm font-medium mb-2">Reverse Calculation (price includes tax)</p>
                <p className="text-sm text-muted-foreground">If the total price is {formatCurrency(results.preTax, 2)}:</p>
                <div className="space-y-1 mt-2 text-sm">
                  <div className="flex justify-between"><span className="text-muted-foreground">Pre-tax portion</span><span>{formatCurrency(results.reversePreTax, 2)}</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Tax portion</span><span>{formatCurrency(results.reverseTax, 2)}</span></div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="mt-12 space-y-6">
        <Card>
          <CardHeader><CardTitle>How This Sales Tax Calculator Works</CardTitle></CardHeader>
          <CardContent className="space-y-4 text-sm">
            <div>
              <h3 className="font-semibold mb-2">Formula</h3>
              <p className="text-muted-foreground">Calculates sales tax based on the item price and applicable tax rate.</p>
              <p className="font-mono text-xs bg-muted p-3 rounded mt-2 overflow-x-auto">Sales Tax = Price × Tax Rate (%)</p>
              <p className="text-muted-foreground mt-2 text-xs">Total = Price + Sales Tax</p>
            </div>

            <Separator />

            <div>
              <h3 className="font-semibold mb-2">Worked Example</h3>
              <p className="text-muted-foreground">You buy a laptop for $1,000 in a state with 7% sales tax:</p>
              <ul className="list-disc list-inside text-muted-foreground mt-2 space-y-1">
                <li>Item price: $1,000</li>
                <li>Sales tax (7%): $70</li>
                <li><strong>Total cost: $1,070</strong></li>
              </ul>
            </div>

            <Separator />

            <div>
              <h3 className="font-semibold mb-2">Common Questions</h3>
              <div className="space-y-3">
                <div>
                  <p className="font-medium text-sm">Do all items have sales tax?</p>
                  <p className="text-muted-foreground text-sm">No. Most states exempt groceries, medications, and clothing. Some items (alcohol, cars) have additional taxes. Check your state&apos;s rules.</p>
                </div>
                <div>
                  <p className="font-medium text-sm">Why are sales tax rates different by state?</p>
                  <p className="text-muted-foreground text-sm">States set their own rates (0–10%+). Some add local taxes too. Delaware has no sales tax; California reaches 8.625%+ with local additions.</p>
                </div>
                <div>
                  <p className="font-medium text-sm">What about online purchases?</p>
                  <p className="text-muted-foreground text-sm">Since 2018, online retailers must collect sales tax if they have nexus (business presence) in your state. Rates vary by destination, not seller.</p>
                </div>
              </div>
            </div>

            <Separator />

            <div>
              <h3 className="font-semibold mb-2">Key Takeaways</h3>
              <ul className="list-disc list-inside text-muted-foreground space-y-1">
                <li>Sales tax varies widely by state—moving from California (8.6%+) to Nevada (6.85%) saves on purchases.</li>
                <li>Budget for sales tax on major purchases; it adds up quickly on expensive items.</li>
                <li>Some items (groceries, medicine) are exempt in most states—always ask at checkout.</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </CalculatorLayout>
  );
}
