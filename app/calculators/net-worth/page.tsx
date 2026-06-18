'use client';

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
    </CalculatorLayout>
  );
}
