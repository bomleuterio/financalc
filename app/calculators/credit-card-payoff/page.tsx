'use client';

import Link from 'next/link';
import { useState, useMemo } from 'react';
import CalculatorLayout from '@/components/CalculatorLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { calculateCreditCardPayoff, calculateMinimumPayoffTime, formatCurrency } from '@/lib/calculators';
import NoSSR from '@/components/NoSSR';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function CreditCardPayoffPage() {
  const [balance, setBalance] = useState('5000');
  const [rate, setRate] = useState('22.99');
  const [payment, setPayment] = useState('200');

  const results = useMemo(() => {
    const b = Number(balance);
    const r = Number(rate);
    const p = Number(payment);
    if (b <= 0 || r <= 0) return null;

    const minPayResult = calculateMinimumPayoffTime(b, r);
    const fixedPayResult = p > 0 ? calculateCreditCardPayoff(b, r, p) : null;

    // Calculate what payment pays off in 1, 2, 3 years
    const targets = [12, 24, 36, 48, 60].map((months) => {
      const r2 = r / 100 / 12;
      const pmnt = r2 === 0 ? b / months : (b * r2 * Math.pow(1 + r2, months)) / (Math.pow(1 + r2, months) - 1);
      return { months, payment: pmnt };
    });

    return { minPayResult, fixedPayResult, targets, b };
  }, [balance, rate, payment]);

  const chartData = useMemo(() => {
    if (!results?.fixedPayResult) return [];
    return results.fixedPayResult.schedule
      .filter((_, i) => i % 3 === 0 || i === results.fixedPayResult!.schedule.length - 1)
      .map((row) => ({ month: row.month, balance: Math.round(row.balance) }));
  }, [results]);

  return (
    <CalculatorLayout
      title="Credit Card Payoff Calculator"
      description="Find out how long it will take to pay off your credit card debt and how much interest you'll pay."
      category="Credit"
    >
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader><CardTitle className="text-base">Credit Card Details</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div><Label>Current Balance ($)</Label><Input type="number" value={balance} onChange={(e) => setBalance(e.target.value)} min="0" /></div>
              <div>
                <Label>Annual Interest Rate (APR %)</Label>
                <Input type="number" step="0.01" value={rate} onChange={(e) => setRate(e.target.value)} min="0" max="50" />
                <p className="text-xs text-muted-foreground mt-1">Average credit card APR: ~22–27%</p>
              </div>
              <div>
                <Label>Monthly Payment ($)</Label>
                <Input type="number" value={payment} onChange={(e) => setPayment(e.target.value)} min="0" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-3 space-y-6">
          {results ? (
            <>
              <Card>
                <CardHeader><CardTitle className="text-base">Payoff Comparison</CardTitle></CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <p className="text-xs text-muted-foreground uppercase tracking-wide mb-2">Minimum Payments</p>
                      <p className="text-2xl font-bold text-destructive">{Math.floor(results.minPayResult.months / 12)} yrs {results.minPayResult.months % 12} mo</p>
                      <p className="text-sm text-muted-foreground mt-1">to pay off</p>
                      <p className="text-lg font-semibold mt-2">{formatCurrency(results.minPayResult.totalInterest)}</p>
                      <p className="text-xs text-muted-foreground">total interest</p>
                    </div>
                    {results.fixedPayResult && (
                      <div>
                        <p className="text-xs text-muted-foreground uppercase tracking-wide mb-2">Fixed {formatCurrency(Number(payment), 0)}/mo</p>
                        <p className="text-2xl font-bold text-primary">{Math.floor(results.fixedPayResult.months / 12)} yrs {results.fixedPayResult.months % 12} mo</p>
                        <p className="text-sm text-muted-foreground mt-1">to pay off</p>
                        <p className="text-lg font-semibold mt-2">{formatCurrency(results.fixedPayResult.totalInterest)}</p>
                        <p className="text-xs text-muted-foreground">total interest</p>
                      </div>
                    )}
                  </div>

                  {results.fixedPayResult && (
                    <>
                      <Separator className="my-4" />
                      <p className="text-sm text-primary font-medium">
                        You save {formatCurrency(results.minPayResult.totalInterest - results.fixedPayResult.totalInterest)} in interest vs. minimum payments!
                      </p>
                    </>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader><CardTitle className="text-base">Payment to Pay Off By Date</CardTitle></CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {results.targets.map((t) => (
                      <div key={t.months} className="flex justify-between items-center text-sm">
                        <span className="text-muted-foreground">Pay off in {t.months} months ({t.months / 12} yrs)</span>
                        <span className="font-semibold">{formatCurrency(t.payment, 2)}/mo</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {chartData.length > 0 && (
                <Card>
                  <CardHeader><CardTitle className="text-base">Balance Reduction ({formatCurrency(Number(payment), 0)}/mo)</CardTitle></CardHeader>
                  <CardContent>
                    <NoSSR>
                      <ResponsiveContainer width="100%" height={220}>
                        <LineChart data={chartData} margin={{ top: 5, right: 5, left: 10, bottom: 5 }}>
                          <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                          <XAxis dataKey="month" tickFormatter={(v) => `Mo ${v}`} stroke="var(--color-muted-foreground)" fontSize={12} />
                          <YAxis tickFormatter={(v) => `$${(v / 1000).toFixed(1)}k`} stroke="var(--color-muted-foreground)" fontSize={12} />
                          <Tooltip formatter={(v) => formatCurrency(v as number)} contentStyle={{ background: 'var(--color-card)', border: '1px solid var(--color-border)', borderRadius: '8px' }} />
                          <Line type="monotone" dataKey="balance" name="Remaining Balance" stroke="var(--color-chart-1)" strokeWidth={2} dot={false} />
                        </LineChart>
                      </ResponsiveContainer>
                    </NoSSR>
                  </CardContent>
                </Card>
              )}
            </>
          ) : (
            <Card><CardContent className="py-12 text-center text-muted-foreground">Enter credit card details to see your payoff plan.</CardContent></Card>
          )}
        </div>
      </div>

      <div className="mt-12 space-y-6">
        <Card>
          <CardHeader><CardTitle>How Your Payoff Date Is Calculated</CardTitle></CardHeader>
          <CardContent className="space-y-4 text-sm">
            <div>
              <h3 className="font-semibold mb-2">The Payoff Formula</h3>
              <p className="text-muted-foreground">Calculates payoff timeline based on balance, interest rate (APR), and monthly payment. Higher payments reduce interest paid.</p>
              <p className="font-mono text-xs bg-muted p-3 rounded mt-2 overflow-x-auto">Months to Payoff = -log(1 - (Balance × Monthly Rate / Payment)) / log(1 + Monthly Rate)</p>
            </div>

            <Separator />

            <div>
              <h3 className="font-semibold mb-2">Example: $5,000 at 18% APR</h3>
              <p className="text-muted-foreground">$5,000 balance at 18% APR, paying $150/month:</p>
              <ul className="list-disc list-inside text-muted-foreground mt-2 space-y-1">
                <li>Balance: $5,000</li>
                <li>APR: 18%</li>
                <li>Monthly payment: $150</li>
                <li><strong>Months to payoff: 47 months (~3.9 years)</strong></li>
                <li>Total interest paid: $1,984</li>
              </ul>
            </div>

            <Separator />

            <div>
              <h3 className="font-semibold mb-2">Payoff Questions</h3>
              <div className="space-y-3">
                <div>
                  <p className="font-medium text-sm">How much should I pay monthly?</p>
                  <p className="text-muted-foreground text-sm">Minimum (2–3% of balance) keeps you in debt for years. $200 vs. $150 on a $5k balance saves 15 months and $670 in interest.</p>
                </div>
                <div>
                  <p className="font-medium text-sm">Should I pay off multiple cards?</p>
                  <p className="text-muted-foreground text-sm">Avalanche (highest rate first) saves the most interest. Snowball (smallest balance first) provides psychological wins. Pick what motivates you.</p>
                </div>
                <div>
                  <p className="font-medium text-sm">Can I negotiate a lower rate?</p>
                  <p className="text-muted-foreground text-sm">Call your issuer and ask. A long, on-time payment history gives you the best chance of a lower rate, and the call costs nothing.</p>
                </div>
              </div>
            </div>

            <Separator />

            <div>
              <h3 className="font-semibold mb-2">Staying Out of Debt</h3>
              <ul className="list-disc list-inside text-muted-foreground space-y-1">
                <li>Credit card debt is expensive (15–25% APR)—prioritize paying it off over investing.</li>
                <li>Even $50 extra per month cuts months off your payoff and saves hundreds in interest; on larger balances the savings run into thousands.</li>
                <li>Once cleared, avoid rebuilding debt—use cards for rewards, pay in full monthly.</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>What Your Payment Choice Costs</CardTitle></CardHeader>
          <CardContent className="space-y-4 text-sm">
            <p className="text-muted-foreground">The same $5,000 balance at 20% APR, paid off at four different fixed monthly payments:</p>
              <div className="overflow-x-auto rounded-lg border border-border/60">
                <table className="w-full text-sm">
                  <thead className="bg-muted/40">
                    <tr><th className="px-3 py-2 text-left font-semibold">Monthly payment</th><th className="px-3 py-2 text-left font-semibold">Time to pay off</th><th className="px-3 py-2 text-left font-semibold">Total interest</th></tr>
                  </thead>
                  <tbody>
                    <tr className="border-t border-border/60"><td className="px-3 py-2 tabular-nums">$100</td><td className="px-3 py-2 tabular-nums">109 months</td><td className="px-3 py-2 tabular-nums">$5,840</td></tr>
                    <tr className="border-t border-border/60"><td className="px-3 py-2 tabular-nums">$150</td><td className="px-3 py-2 tabular-nums">50 months</td><td className="px-3 py-2 tabular-nums">$2,359</td></tr>
                    <tr className="border-t border-border/60"><td className="px-3 py-2 tabular-nums">$200</td><td className="px-3 py-2 tabular-nums">33 months</td><td className="px-3 py-2 tabular-nums">$1,522</td></tr>
                    <tr className="border-t border-border/60"><td className="px-3 py-2 tabular-nums">$300</td><td className="px-3 py-2 tabular-nums">20 months</td><td className="px-3 py-2 tabular-nums">$907</td></tr>
                  </tbody>
                </table>
              </div>
            <p className="text-muted-foreground">Doubling the payment from $100 to $200 cuts the interest by about three-quarters. Paying only the card’s shrinking minimum is slower still: with a typical 1%-plus-interest minimum, this balance would take almost 19 years to clear.</p>
            <Separator />
            <h3 className="font-semibold">If You Have More Than One Card</h3>
            <p className="text-muted-foreground">Pay the minimum on every card and send extra money to one target. The avalanche method (highest APR first) saves the most interest; the snowball method (smallest balance first) clears a debt sooner. The debt payoff calculator compares both with your real balances.</p>
            <Separator />
            <div>
              <h3 className="font-semibold mb-2">Related Guides</h3>
              <ul className="list-disc list-inside text-muted-foreground space-y-1">
                <li><Link href="/blog/credit-card-debt-payoff-guide" className="text-primary underline">How to pay off credit card debt: avalanche vs. snowball</Link></li>
                <li><Link href="/blog/pay-off-debt-or-invest" className="text-primary underline">Pay off debt or invest?</Link></li>
                <li><Link href="/calculators/debt-payoff" className="text-primary underline">Debt payoff calculator</Link></li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </CalculatorLayout>
  );
}
