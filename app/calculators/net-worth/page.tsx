'use client';

import Link from 'next/link';
import { useState, useMemo } from 'react';
import CalculatorLayout from '@/components/CalculatorLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { formatCurrency } from '@/lib/calculators';
import NoSSR from '@/components/NoSSR';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

interface Item { id: number; name: string; value: string; }

const defaultAssets: Item[] = [
  { id: 1, name: 'Checking Account', value: '5000' },
  { id: 2, name: 'Savings Account', value: '15000' },
  { id: 3, name: 'Retirement Accounts', value: '50000' },
  { id: 4, name: 'Investment Portfolio', value: '20000' },
  { id: 5, name: 'Primary Home', value: '350000' },
  { id: 6, name: 'Vehicle(s)', value: '20000' },
];

const defaultLiabilities: Item[] = [
  { id: 1, name: 'Mortgage', value: '280000' },
  { id: 2, name: 'Car Loan', value: '12000' },
  { id: 3, name: 'Credit Card Debt', value: '3000' },
  { id: 4, name: 'Student Loans', value: '15000' },
];

export default function NetWorthPage() {
  const [assets, setAssets] = useState<Item[]>(defaultAssets);
  const [liabilities, setLiabilities] = useState<Item[]>(defaultLiabilities);

  const addItem = (type: 'asset' | 'liability') => {
    const newItem = { id: Date.now(), name: type === 'asset' ? 'New Asset' : 'New Liability', value: '0' };
    if (type === 'asset') setAssets((p) => [...p, newItem]);
    else setLiabilities((p) => [...p, newItem]);
  };

  const removeItem = (type: 'asset' | 'liability', id: number) => {
    if (type === 'asset') setAssets((p) => p.filter((i) => i.id !== id));
    else setLiabilities((p) => p.filter((i) => i.id !== id));
  };

  const updateItem = (type: 'asset' | 'liability', id: number, field: 'name' | 'value', val: string) => {
    const updater = (items: Item[]) => items.map((i) => (i.id === id ? { ...i, [field]: val } : i));
    if (type === 'asset') setAssets(updater);
    else setLiabilities(updater);
  };

  const results = useMemo(() => {
    const totalAssets = assets.reduce((s, i) => s + Number(i.value), 0);
    const totalLiabilities = liabilities.reduce((s, i) => s + Number(i.value), 0);
    const netWorth = totalAssets - totalLiabilities;
    const debtToAssetRatio = totalAssets > 0 ? (totalLiabilities / totalAssets) * 100 : 0;
    return { totalAssets, totalLiabilities, netWorth, debtToAssetRatio };
  }, [assets, liabilities]);

  const barData = [
    { name: 'Assets', value: results.totalAssets },
    { name: 'Liabilities', value: results.totalLiabilities },
    { name: 'Net Worth', value: results.netWorth },
  ];

  const ItemList = ({ type, items }: { type: 'asset' | 'liability'; items: Item[] }) => (
    <div className="space-y-2">
      {items.map((item) => (
        <div key={item.id} className="flex items-center gap-2">
          <Input
            value={item.name}
            onChange={(e) => updateItem(type, item.id, 'name', e.target.value)}
            className="flex-1 h-8 text-sm"
          />
          <Input
            type="number"
            value={item.value}
            onChange={(e) => updateItem(type, item.id, 'value', e.target.value)}
            className="w-28 h-8 text-sm"
            min="0"
          />
          <button onClick={() => removeItem(type, item.id)} className="text-xs text-destructive px-1">✕</button>
        </div>
      ))}
      <button onClick={() => addItem(type)} className="text-sm text-primary underline underline-offset-2">+ Add {type}</button>
    </div>
  );

  return (
    <CalculatorLayout title="Net Worth Calculator" description="Calculate your total net worth by listing all your assets and liabilities." category="Budget">
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <Card>
            <CardHeader><CardTitle className="text-base text-primary">Assets</CardTitle></CardHeader>
            <CardContent><ItemList type="asset" items={assets} /></CardContent>
          </Card>
          <Card>
            <CardHeader><CardTitle className="text-base text-destructive">Liabilities</CardTitle></CardHeader>
            <CardContent><ItemList type="liability" items={liabilities} /></CardContent>
          </Card>
        </div>

        <div className="lg:col-span-3 space-y-6">
          <Card>
            <CardHeader><CardTitle className="text-base">Net Worth Summary</CardTitle></CardHeader>
            <CardContent>
              <p className={`text-4xl font-bold ${results.netWorth >= 0 ? 'text-primary' : 'text-destructive'}`}>
                {formatCurrency(results.netWorth)}
              </p>
              <p className="text-sm text-muted-foreground mt-1">net worth</p>
              <Separator className="my-4" />
              <div className="grid grid-cols-2 gap-4">
                <div><p className="text-xs text-muted-foreground uppercase tracking-wide">Total Assets</p><p className="text-lg font-semibold text-primary">{formatCurrency(results.totalAssets)}</p></div>
                <div><p className="text-xs text-muted-foreground uppercase tracking-wide">Total Liabilities</p><p className="text-lg font-semibold text-destructive">{formatCurrency(results.totalLiabilities)}</p></div>
                <div><p className="text-xs text-muted-foreground uppercase tracking-wide">Debt-to-Asset Ratio</p><p className="text-lg font-semibold">{results.debtToAssetRatio.toFixed(1)}%</p></div>
                <div><p className="text-xs text-muted-foreground uppercase tracking-wide">Debt-free %</p><p className="text-lg font-semibold">{(100 - results.debtToAssetRatio).toFixed(1)}%</p></div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle className="text-base">Financial Overview</CardTitle></CardHeader>
            <CardContent>
              <NoSSR>
                <ResponsiveContainer width="100%" height={220}>
                  <BarChart data={barData} margin={{ top: 5, right: 5, left: 10, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                    <XAxis dataKey="name" stroke="var(--color-muted-foreground)" fontSize={12} />
                    <YAxis tickFormatter={(v) => v >= 1000000 ? `$${(v / 1000000).toFixed(1)}M` : `$${(v / 1000).toFixed(0)}k`} stroke="var(--color-muted-foreground)" fontSize={12} />
                    <Tooltip formatter={(v) => formatCurrency(v as number)} contentStyle={{ background: 'var(--color-card)', border: '1px solid var(--color-border)', borderRadius: '8px' }} />
                    <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                      {barData.map((entry, i) => (
                        <Cell key={i} fill={i === 0 ? 'var(--color-chart-1)' : i === 1 ? 'var(--color-chart-5)' : entry.value >= 0 ? 'var(--color-chart-2)' : 'hsl(var(--destructive))'} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </NoSSR>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="mt-12 space-y-6">
        <Card>
          <CardHeader><CardTitle>How Net Worth Is Calculated</CardTitle></CardHeader>
          <CardContent className="space-y-4 text-sm">
            <div>
              <h3 className="font-semibold mb-2">Assets Minus Liabilities</h3>
              <p className="text-muted-foreground">Net worth measures your financial health—the difference between what you own and what you owe.</p>
              <p className="font-mono text-xs bg-muted p-3 rounded mt-2 overflow-x-auto">Net Worth = Total Assets - Total Liabilities</p>
            </div>

            <Separator />

            <div>
              <h3 className="font-semibold mb-2">Example: A Household Snapshot</h3>
              <p className="text-muted-foreground">Your financial snapshot:</p>
              <ul className="list-disc list-inside text-muted-foreground mt-2 space-y-1">
                <li>Home: $400,000</li>
                <li>Investments: $150,000</li>
                <li>Cash: $25,000</li>
                <li>Car: $20,000</li>
                <li>Mortgage: -$300,000</li>
                <li>Car loan: -$15,000</li>
                <li><strong>Net worth: $280,000</strong></li>
              </ul>
            </div>

            <Separator />

            <div>
              <h3 className="font-semibold mb-2">Net Worth Questions</h3>
              <div className="space-y-3">
                <div>
                  <p className="font-medium text-sm">Should I include my car in net worth?</p>
                  <p className="text-muted-foreground text-sm">Yes, but recognize it&apos;s a depreciating asset (loses 20%/year). For planning, focus on appreciating assets (real estate, investments).</p>
                </div>
                <div>
                  <p className="font-medium text-sm">What&apos;s a good net worth target?</p>
                  <p className="text-muted-foreground text-sm">By age 30: $50k–$100k. Age 40: $200k–$500k. Age 55: $1M+. These are benchmarks; your path depends on income and priorities.</p>
                </div>
                <div>
                  <p className="font-medium text-sm">How do I increase my net worth?</p>
                  <p className="text-muted-foreground text-sm">Earn more, spend less, invest the difference. 50% income growth + 20% expense cut + 7% returns = $1M in 20 years.</p>
                </div>
              </div>
            </div>

            <Separator />

            <div>
              <h3 className="font-semibold mb-2">Using Your Number</h3>
              <ul className="list-disc list-inside text-muted-foreground space-y-1">
                <li>Net worth = financial freedom metric; track it annually to see your progress.</li>
                <li>Don&apos;t obsess over it—focus on controllables: earn, save, invest consistently.</li>
                <li>Millionaires typically build wealth slowly through discipline, not overnight success.</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Making Your Net Worth Number Useful</CardTitle></CardHeader>
          <CardContent className="space-y-4 text-sm">
            <p className="text-muted-foreground">A single number is less useful than how it changes. Recalculate on the same date each year — or each quarter — using the same method, and watch the trend.</p>
            <p className="text-muted-foreground">Two refinements make it more informative:</p>
            <ul className="list-disc list-inside text-muted-foreground space-y-1">
              <li><strong>Liquid net worth</strong>: leave out your home and car. What remains is what you could actually draw on in an emergency or an early retirement.</li>
              <li><strong>Use realistic values</strong>: value a car at its private-sale price and a home at a recent comparable sale minus the agent fees and closing costs you would pay to sell, not its purchase price.</li>
            </ul>
            <p className="text-muted-foreground">Paying down debt raises net worth exactly as much as adding to savings, so a falling mortgage balance counts as progress even when your bank balance stays flat.</p>
            <Separator />
            <div>
              <h3 className="font-semibold mb-2">Related Guides</h3>
              <ul className="list-disc list-inside text-muted-foreground space-y-1">
                <li><Link href="/blog/how-compound-growth-builds-wealth" className="text-primary underline">How compound growth builds wealth</Link></li>
                <li><Link href="/blog/pay-off-debt-or-invest" className="text-primary underline">Pay off debt or invest?</Link></li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </CalculatorLayout>
  );
}
