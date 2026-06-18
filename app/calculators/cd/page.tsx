'use client';

import { useState, useMemo } from 'react';
import CalculatorLayout from '@/components/CalculatorLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { formatCurrency, formatPercent } from '@/lib/calculators';

export default function CDPage() {
  const [principal, setPrincipal] = useState('10000');
  const [rate, setRate] = useState('5.0');
  const [term, setTerm] = useState('12');
  const [compounds, setCompounds] = useState('12');

  const results = useMemo(() => {
    const p = Number(principal);
    const r = Number(rate) / 100;
    const n = Number(compounds);
    const t = Number(term) / 12;
    if (p <= 0 || r <= 0 || t <= 0) return null;

    const balance = p * Math.pow(1 + r / n, n * t);
    const interest = balance - p;
    const apy = (Math.pow(1 + r / n, n) - 1) * 100;
    const earlyWithdrawalPenalty = interest * 0.5;

    return { balance, interest, apy, earlyWithdrawalPenalty, p };
  }, [principal, rate, term, compounds]);

  return (
    <CalculatorLayout title="CD Calculator" description="Calculate earnings on a Certificate of Deposit with your chosen term and rate." category="Savings">
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader><CardTitle className="text-base">CD Details</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div><Label>Deposit Amount ($)</Label><Input type="number" value={principal} onChange={(e) => setPrincipal(e.target.value)} min="0" /></div>
              <div>
                <Label>APY / Interest Rate (%)</Label>
                <Input type="number" step="0.05" value={rate} onChange={(e) => setRate(e.target.value)} min="0" max="15" />
              </div>
              <div>
                <Label>CD Term</Label>
                <Select value={term} onValueChange={(v) => v != null && setTerm(v)}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {[3, 6, 9, 12, 18, 24, 36, 48, 60].map((m) => (
                      <SelectItem key={m} value={String(m)}>{m} months{m >= 12 ? ` (${m / 12} yr${m > 12 ? 's' : ''})` : ''}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Compounding</Label>
                <Select value={compounds} onValueChange={(v) => v != null && setCompounds(v)}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Annually</SelectItem>
                    <SelectItem value="2">Semi-annually</SelectItem>
                    <SelectItem value="4">Quarterly</SelectItem>
                    <SelectItem value="12">Monthly</SelectItem>
                    <SelectItem value="365">Daily</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="lg:col-span-3">
          {results ? (
            <Card>
              <CardHeader><CardTitle className="text-base">CD Earnings</CardTitle></CardHeader>
              <CardContent>
                <p className="text-4xl font-bold text-primary">{formatCurrency(results.balance, 2)}</p>
                <p className="text-sm text-muted-foreground mt-1">at maturity after {term} months</p>
                <Separator className="my-4" />
                <div className="grid grid-cols-2 gap-4">
                  <div><p className="text-xs text-muted-foreground uppercase tracking-wide">Principal</p><p className="text-lg font-semibold">{formatCurrency(results.p)}</p></div>
                  <div><p className="text-xs text-muted-foreground uppercase tracking-wide">Interest Earned</p><p className="text-lg font-semibold text-primary">{formatCurrency(results.interest, 2)}</p></div>
                  <div><p className="text-xs text-muted-foreground uppercase tracking-wide">APY</p><p className="text-lg font-semibold">{formatPercent(results.apy, 3)}</p></div>
                  <div><p className="text-xs text-muted-foreground uppercase tracking-wide">Early Withdrawal Est.</p><p className="text-lg font-semibold text-destructive">-{formatCurrency(results.earlyWithdrawalPenalty, 2)}</p></div>
                </div>
                <Separator className="my-4" />
                <p className="text-xs text-muted-foreground">Early withdrawal penalty estimate is ~6 months of interest (varies by bank).</p>
              </CardContent>
            </Card>
          ) : (
            <Card><CardContent className="py-12 text-center text-muted-foreground">Enter CD details to see earnings.</CardContent></Card>
          )}
        </div>
      </div>
    </CalculatorLayout>
  );
}
