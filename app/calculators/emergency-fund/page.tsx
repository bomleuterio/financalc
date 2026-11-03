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

      <div className="mt-12 space-y-6">
        <Card>
          <CardHeader><CardTitle>How Your Emergency Fund Target Is Calculated</CardTitle></CardHeader>
          <CardContent className="space-y-4 text-sm">
            <div>
              <h3 className="font-semibold mb-2">The Calculation</h3>
              <p className="text-muted-foreground">Calculates the recommended emergency fund size based on your monthly expenses and desired safety margin.</p>
              <p className="font-mono text-xs bg-muted p-3 rounded mt-2 overflow-x-auto">Emergency Fund = Monthly Expenses × Number of Months (3–6)</p>
            </div>

            <Separator />

            <div>
              <h3 className="font-semibold mb-2">Example: $4,000 of Monthly Expenses</h3>
              <p className="text-muted-foreground">Your monthly expenses are $4,000:</p>
              <ul className="list-disc list-inside text-muted-foreground mt-2 space-y-1">
                <li>Conservative (3 months): $12,000</li>
                <li>Moderate (4 months): $16,000</li>
                <li>Recommended (6 months): $24,000</li>
                <li>High earner (12 months): $48,000</li>
              </ul>
            </div>

            <Separator />

            <div>
              <h3 className="font-semibold mb-2">Emergency Fund Questions</h3>
              <div className="space-y-3">
                <div>
                  <p className="font-medium text-sm">How many months should I save?</p>
                  <p className="text-muted-foreground text-sm">Minimum 3 months if you have stable income. Recommended 6 months for job security/health concerns. Self-employed or high-income earners: 9–12 months.</p>
                </div>
                <div>
                  <p className="font-medium text-sm">Where should I keep it?</p>
                  <p className="text-muted-foreground text-sm">High-yield savings account or money market fund, which typically pay several times the national average savings rate. NOT investments—you need quick access, not growth.</p>
                </div>
                <div>
                  <p className="font-medium text-sm">What counts as an emergency?</p>
                  <p className="text-muted-foreground text-sm">Job loss, medical bills, major car/home repairs. NOT: vacation, Black Friday sales, or discretionary spending.</p>
                </div>
              </div>
            </div>

            <Separator />

            <div>
              <h3 className="font-semibold mb-2">Building It Up</h3>
              <ul className="list-disc list-inside text-muted-foreground space-y-1">
                <li>An emergency fund prevents high-interest debt during hardship—it&apos;s not optional.</li>
                <li>Start small (1 month), then build to 3–6 months. Don&apos;t max retirement accounts until you have this cushion.</li>
                <li>Keep it liquid and accessible; high-yield savings accounts earn 4%+ with zero risk.</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Targets at a Glance</CardTitle></CardHeader>
          <CardContent className="space-y-4 text-sm">
            <p className="text-muted-foreground">Find the row closest to your essential monthly expenses:</p>
              <div className="overflow-x-auto rounded-lg border border-border/60">
                <table className="w-full text-sm">
                  <thead className="bg-muted/40">
                    <tr><th className="px-3 py-2 text-left font-semibold">Essential expenses / month</th><th className="px-3 py-2 text-left font-semibold">3 months</th><th className="px-3 py-2 text-left font-semibold">6 months</th><th className="px-3 py-2 text-left font-semibold">9 months</th></tr>
                  </thead>
                  <tbody>
                    <tr className="border-t border-border/60"><td className="px-3 py-2 tabular-nums">$3,000</td><td className="px-3 py-2 tabular-nums">$9,000</td><td className="px-3 py-2 tabular-nums">$18,000</td><td className="px-3 py-2 tabular-nums">$27,000</td></tr>
                    <tr className="border-t border-border/60"><td className="px-3 py-2 tabular-nums">$4,000</td><td className="px-3 py-2 tabular-nums">$12,000</td><td className="px-3 py-2 tabular-nums">$24,000</td><td className="px-3 py-2 tabular-nums">$36,000</td></tr>
                    <tr className="border-t border-border/60"><td className="px-3 py-2 tabular-nums">$5,000</td><td className="px-3 py-2 tabular-nums">$15,000</td><td className="px-3 py-2 tabular-nums">$30,000</td><td className="px-3 py-2 tabular-nums">$45,000</td></tr>
                  </tbody>
                </table>
              </div>
            <p className="text-muted-foreground">Count only what you would still have to pay if your income stopped:</p>
            <ul className="list-disc list-inside text-muted-foreground space-y-1">
              <li>Rent or mortgage, property tax, and insurance</li>
              <li>Utilities, phone, and internet</li>
              <li>Groceries (not dining out)</li>
              <li>Car payment, insurance, fuel, or transit</li>
              <li>Health insurance premiums and regular prescriptions</li>
              <li>Minimum payments on every debt</li>
              <li>Childcare and other fixed obligations</li>
            </ul>
            <p className="text-muted-foreground">Aim for the higher columns with a single income, dependents, variable pay, or a field where job searches take longer.</p>
            <Separator />
            <div>
              <h3 className="font-semibold mb-2">Related Guides</h3>
              <ul className="list-disc list-inside text-muted-foreground space-y-1">
                <li><Link href="/blog/emergency-fund-guide" className="text-primary underline">Building an emergency fund: how much is enough?</Link></li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </CalculatorLayout>
  );
}
