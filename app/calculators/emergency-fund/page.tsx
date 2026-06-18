'use client';

import { useState, useMemo } from 'react';
import CalculatorLayout from '@/components/CalculatorLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { formatCurrency } from '@/lib/calculators';

export default function EmergencyFundPage() {
  const [rent, setRent] = useState('1500');
  const [utilities, setUtilities] = useState('200');
  const [food, setFood] = useState('600');
  const [transport, setTransport] = useState('400');
  const [insurance, setInsurance] = useState('300');
  const [other, setOther] = useState('300');
  const [months, setMonths] = useState('6');
  const [currentSavings, setCurrentSavings] = useState('5000');

  const results = useMemo(() => {
    const monthly = Number(rent) + Number(utilities) + Number(food) + Number(transport) + Number(insurance) + Number(other);
    const target = monthly * Number(months);
    const current = Number(currentSavings);
    const gap = Math.max(0, target - current);
    const percentFunded = current >= target ? 100 : (current / target) * 100;

    return { monthly, target, current, gap, percentFunded };
  }, [rent, utilities, food, transport, insurance, other, months, currentSavings]);

  const statusColor = results.percentFunded >= 100 ? 'text-primary' : results.percentFunded >= 50 ? 'text-amber-500' : 'text-destructive';

  return (
    <CalculatorLayout title="Emergency Fund Calculator" description="Calculate how much you need in your emergency fund and how far you are from the goal." category="Savings">
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <Card>
            <CardHeader><CardTitle className="text-base">Monthly Essential Expenses</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div><Label>Rent / Mortgage ($)</Label><Input type="number" value={rent} onChange={(e) => setRent(e.target.value)} min="0" /></div>
              <div><Label>Utilities ($)</Label><Input type="number" value={utilities} onChange={(e) => setUtilities(e.target.value)} min="0" /></div>
              <div><Label>Food & Groceries ($)</Label><Input type="number" value={food} onChange={(e) => setFood(e.target.value)} min="0" /></div>
              <div><Label>Transportation ($)</Label><Input type="number" value={transport} onChange={(e) => setTransport(e.target.value)} min="0" /></div>
              <div><Label>Insurance ($)</Label><Input type="number" value={insurance} onChange={(e) => setInsurance(e.target.value)} min="0" /></div>
              <div><Label>Other Essentials ($)</Label><Input type="number" value={other} onChange={(e) => setOther(e.target.value)} min="0" /></div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader><CardTitle className="text-base">Your Goal</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Months to Cover</Label>
                <Select value={months} onValueChange={(v) => v != null && setMonths(v)}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="3">3 months (minimum)</SelectItem>
                    <SelectItem value="6">6 months (recommended)</SelectItem>
                    <SelectItem value="9">9 months</SelectItem>
                    <SelectItem value="12">12 months (conservative)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div><Label>Current Emergency Savings ($)</Label><Input type="number" value={currentSavings} onChange={(e) => setCurrentSavings(e.target.value)} min="0" /></div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-3">
          <Card>
            <CardHeader><CardTitle className="text-base">Emergency Fund Analysis</CardTitle></CardHeader>
            <CardContent>
              <p className="text-4xl font-bold text-primary">{formatCurrency(results.target)}</p>
              <p className="text-sm text-muted-foreground mt-1">target fund ({months} months of expenses)</p>

              <Separator className="my-4" />

              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Monthly essential expenses</span>
                  <span className="font-semibold">{formatCurrency(results.monthly)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Current savings</span>
                  <span className="font-semibold">{formatCurrency(results.current)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Target amount</span>
                  <span className="font-semibold">{formatCurrency(results.target)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Still needed</span>
                  <span className={`font-semibold ${results.gap === 0 ? 'text-primary' : 'text-destructive'}`}>
                    {results.gap === 0 ? 'Goal met! ✓' : formatCurrency(results.gap)}
                  </span>
                </div>
              </div>

              <Separator className="my-4" />

              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-muted-foreground">Progress</span>
                  <span className={`font-medium ${statusColor}`}>{results.percentFunded.toFixed(0)}% funded</span>
                </div>
                <div className="w-full bg-muted rounded-full h-3">
                  <div
                    className="bg-primary h-3 rounded-full transition-all"
                    style={{ width: `${Math.min(100, results.percentFunded)}%` }}
                  />
                </div>
              </div>

              <Separator className="my-4" />

              {results.gap > 0 && (
                <div className="text-sm text-muted-foreground space-y-1">
                  <p className="font-medium text-foreground">Time to reach goal:</p>
                  <p>Saving $200/month: <strong>{Math.ceil(results.gap / 200)} months</strong></p>
                  <p>Saving $500/month: <strong>{Math.ceil(results.gap / 500)} months</strong></p>
                  <p>Saving $1,000/month: <strong>{Math.ceil(results.gap / 1000)} months</strong></p>
                </div>
              )}

              {results.percentFunded >= 100 && (
                <Badge className="mt-4 bg-primary text-primary-foreground">Emergency fund fully funded!</Badge>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </CalculatorLayout>
  );
}
