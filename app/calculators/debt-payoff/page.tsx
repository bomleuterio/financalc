'use client';

import { useState, useMemo } from 'react';
import CalculatorLayout from '@/components/CalculatorLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { formatCurrency } from '@/lib/calculators';

interface Debt {
  id: number;
  name: string;
  balance: string;
  rate: string;
  minimum: string;
}

function payoffDebts(
  debts: { balance: number; rate: number; minimum: number; name: string }[],
  extra: number,
  strategy: 'avalanche' | 'snowball'
): { months: number; totalInterest: number } {
  const copy = debts.map((d) => ({ ...d, remaining: d.balance }));
  let months = 0;
  let totalInterest = 0;

  while (copy.some((d) => d.remaining > 0.01) && months < 600) {
    months++;
    let extraLeft = extra;

    // Pay minimums + accrue interest
    for (const d of copy) {
      if (d.remaining <= 0) continue;
      const interest = d.remaining * (d.rate / 100 / 12);
      totalInterest += interest;
      d.remaining += interest;
      const minPay = Math.min(d.minimum, d.remaining);
      d.remaining -= minPay;
    }

    // Sort target debt
    const active = copy.filter((d) => d.remaining > 0.01);
    if (strategy === 'avalanche') active.sort((a, b) => b.rate - a.rate);
    else active.sort((a, b) => a.remaining - b.remaining);

    for (const target of active) {
      if (extraLeft <= 0) break;
      const pay = Math.min(extraLeft, target.remaining);
      target.remaining -= pay;
      extraLeft -= pay;
    }
  }

  return { months, totalInterest };
}

export default function DebtPayoffPage() {
  const [debts, setDebts] = useState<Debt[]>([
    { id: 1, name: 'Credit Card', balance: '5000', rate: '22.99', minimum: '100' },
    { id: 2, name: 'Personal Loan', balance: '8000', rate: '12.5', minimum: '200' },
    { id: 3, name: 'Car Loan', balance: '15000', rate: '7.0', minimum: '300' },
  ]);
  const [extraPayment, setExtraPayment] = useState('200');

  const addDebt = () => setDebts((prev) => [...prev, { id: Date.now(), name: 'New Debt', balance: '1000', rate: '10', minimum: '50' }]);
  const removeDebt = (id: number) => setDebts((prev) => prev.filter((d) => d.id !== id));
  const updateDebt = (id: number, field: keyof Omit<Debt, 'id'>, value: string) =>
    setDebts((prev) => prev.map((d) => (d.id === id ? { ...d, [field]: value } : d)));

  const results = useMemo(() => {
    const parsedDebts = debts.map((d) => ({
      name: d.name,
      balance: Number(d.balance),
      rate: Number(d.rate),
      minimum: Number(d.minimum),
    })).filter((d) => d.balance > 0);

    if (parsedDebts.length === 0) return null;
    const extra = Number(extraPayment);

    const avalanche = payoffDebts(parsedDebts, extra, 'avalanche');
    const snowball = payoffDebts(parsedDebts, extra, 'snowball');

    const totalBalance = parsedDebts.reduce((s, d) => s + d.balance, 0);
    const totalMinimum = parsedDebts.reduce((s, d) => s + d.minimum, 0);

    return { avalanche, snowball, totalBalance, totalMinimum };
  }, [debts, extraPayment]);

  return (
    <CalculatorLayout
      title="Debt Payoff Calculator"
      description="Compare the Avalanche (highest-rate first) vs Snowball (smallest-balance first) debt payoff strategies."
      category="Credit"
    >
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">Your Debts</CardTitle>
                <button onClick={addDebt} className="text-sm text-primary underline underline-offset-2">+ Add debt</button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {debts.map((d) => (
                <div key={d.id} className="space-y-2 pb-3 border-b border-border last:border-0">
                  <div className="flex justify-between items-center">
                    <Input
                      value={d.name}
                      onChange={(e) => updateDebt(d.id, 'name', e.target.value)}
                      className="h-7 text-sm font-medium border-0 p-0 bg-transparent focus-visible:ring-0"
                    />
                    {debts.length > 1 && (
                      <button onClick={() => removeDebt(d.id)} className="text-xs text-destructive">Remove</button>
                    )}
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <div>
                      <Label className="text-xs">Balance ($)</Label>
                      <Input type="number" value={d.balance} onChange={(e) => updateDebt(d.id, 'balance', e.target.value)} className="h-8 text-sm" />
                    </div>
                    <div>
                      <Label className="text-xs">Rate (%)</Label>
                      <Input type="number" step="0.1" value={d.rate} onChange={(e) => updateDebt(d.id, 'rate', e.target.value)} className="h-8 text-sm" />
                    </div>
                    <div>
                      <Label className="text-xs">Min ($)</Label>
                      <Input type="number" value={d.minimum} onChange={(e) => updateDebt(d.id, 'minimum', e.target.value)} className="h-8 text-sm" />
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle className="text-base">Extra Monthly Payment</CardTitle></CardHeader>
            <CardContent>
              <Input type="number" value={extraPayment} onChange={(e) => setExtraPayment(e.target.value)} min="0" />
              <p className="text-xs text-muted-foreground mt-1">Applied after minimums to target debt</p>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-3">
          {results ? (
            <Card>
              <CardHeader><CardTitle className="text-base">Strategy Comparison</CardTitle></CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-6">
                  <div className="p-4 rounded-lg bg-muted/50">
                    <div className="flex items-center gap-2 mb-3">
                      <Badge variant="default">Avalanche</Badge>
                      <span className="text-xs text-muted-foreground">Highest rate first</span>
                    </div>
                    <p className="text-2xl font-bold">{Math.floor(results.avalanche.months / 12)}y {results.avalanche.months % 12}mo</p>
                    <p className="text-sm text-destructive mt-1">{formatCurrency(results.avalanche.totalInterest)} interest</p>
                  </div>
                  <div className="p-4 rounded-lg bg-muted/50">
                    <div className="flex items-center gap-2 mb-3">
                      <Badge variant="secondary">Snowball</Badge>
                      <span className="text-xs text-muted-foreground">Smallest first</span>
                    </div>
                    <p className="text-2xl font-bold">{Math.floor(results.snowball.months / 12)}y {results.snowball.months % 12}mo</p>
                    <p className="text-sm text-destructive mt-1">{formatCurrency(results.snowball.totalInterest)} interest</p>
                  </div>
                </div>

                <Separator className="my-4" />

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between"><span className="text-muted-foreground">Total debt</span><span className="font-medium">{formatCurrency(results.totalBalance)}</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Total minimum payments</span><span className="font-medium">{formatCurrency(results.totalMinimum)}/mo</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Total monthly payment</span><span className="font-medium">{formatCurrency(results.totalMinimum + Number(extraPayment))}/mo</span></div>
                </div>

                <Separator className="my-4" />

                <div className="text-sm">
                  <p className="font-medium mb-2">Which strategy is right for you?</p>
                  <div className="space-y-2 text-muted-foreground">
                    <p><strong className="text-foreground">Avalanche:</strong> Saves the most money in interest. Best if you stay motivated.</p>
                    <p><strong className="text-foreground">Snowball:</strong> Pays off small debts first for psychological wins. Better for motivation.</p>
                  </div>
                </div>

                {results.avalanche.totalInterest < results.snowball.totalInterest && (
                  <div className="mt-4 p-3 bg-primary/10 rounded-lg text-sm text-primary">
                    Avalanche saves you {formatCurrency(results.snowball.totalInterest - results.avalanche.totalInterest)} more in interest.
                  </div>
                )}
              </CardContent>
            </Card>
          ) : (
            <Card><CardContent className="py-12 text-center text-muted-foreground">Add your debts to compare strategies.</CardContent></Card>
          )}
        </div>
      </div>
    </CalculatorLayout>
  );
}
