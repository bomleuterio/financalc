'use client';

import { useEffect, useState } from 'react';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import NoSSR from '@/components/NoSSR';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { formatCurrency, formatPercent } from '@/lib/calculators';
import { NET_WORTH_SUMMARY, ACCOUNTS, NET_WORTH_TREND, GOALS, AS_OF } from '@/lib/mock-accounts';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Wallet, PiggyBank, TrendingUp, Home, Landmark, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const ICONS = {
  checking: Wallet,
  savings: PiggyBank,
  investments: TrendingUp,
  home: Home,
  retirement: Landmark,
};

export default function SavePage() {
  const [range, setRange] = useState('12m');

  useEffect(() => {
    document.title = 'Save | MoneyCalcs.AI';
  }, []);

  const trendData =
    range === '6m' ? NET_WORTH_TREND.slice(-6) : range === '3m' ? NET_WORTH_TREND.slice(-3) : NET_WORTH_TREND;

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Nav />
      <main className="flex-1">
        <div className="mx-auto max-w-7xl px-4 py-8 space-y-8">
          {/* Page header */}
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Your money, all in one place</p>
              <h1 className="text-2xl font-bold tracking-tight">Your dashboard</h1>
            </div>
            <p className="text-sm text-muted-foreground">As of {AS_OF}</p>
          </div>

          {/* Hero stat + secondary stats row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <Card className="lg:col-span-1">
              <CardHeader>
                <CardDescription>Net worth</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-bold tracking-tight">
                    {formatCurrency(NET_WORTH_SUMMARY.netWorth)}
                  </span>
                  <Badge variant="secondary" className="gap-1 text-primary bg-primary/15">
                    <ArrowUpRight className="h-3 w-3" />
                    {formatPercent(NET_WORTH_SUMMARY.netWorthChangePct, 1)}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  +{formatCurrency(NET_WORTH_SUMMARY.netWorthChangeAbs)} in the last{' '}
                  {NET_WORTH_SUMMARY.changeWindowMonths} months
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardDescription>Total assets</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-semibold">{formatCurrency(NET_WORTH_SUMMARY.totalAssets)}</span>
                  <Badge variant="secondary" className="gap-1 text-primary bg-primary/15">
                    <ArrowUpRight className="h-3 w-3" />
                    {formatPercent(NET_WORTH_SUMMARY.totalAssetsChangePct, 1)}
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardDescription>Liabilities</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-semibold">{formatCurrency(NET_WORTH_SUMMARY.liabilities)}</span>
                  <Badge
                    variant="secondary"
                    className={cn(
                      'gap-1',
                      NET_WORTH_SUMMARY.liabilitiesChangePct < 0
                        ? 'text-primary bg-primary/15'
                        : 'text-destructive bg-destructive/15'
                    )}
                  >
                    {NET_WORTH_SUMMARY.liabilitiesChangePct < 0 ? (
                      <ArrowDownRight className="h-3 w-3" />
                    ) : (
                      <ArrowUpRight className="h-3 w-3" />
                    )}
                    {formatPercent(Math.abs(NET_WORTH_SUMMARY.liabilitiesChangePct), 1)}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Accounts grid */}
          <section>
            <h2 className="text-lg font-semibold mb-4">Accounts</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              {ACCOUNTS.map((acc) => {
                const Icon = ICONS[acc.icon];
                const up = acc.changePct >= 0;
                return (
                  <Card key={acc.id}>
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Icon className="h-4 w-4 text-muted-foreground" />
                          <CardTitle className="text-sm font-medium">{acc.label}</CardTitle>
                        </div>
                        <Badge
                          variant="secondary"
                          className={cn(
                            'gap-0.5 text-[11px]',
                            up ? 'text-primary bg-primary/15' : 'text-destructive bg-destructive/15'
                          )}
                        >
                          {up ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                          {formatPercent(Math.abs(acc.changePct), 1)}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-xl font-bold">{formatCurrency(acc.balance)}</p>
                      <p className="mt-1 text-xs text-muted-foreground">{acc.meta}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </section>

          {/* Net worth trend chart */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-base">Net worth trend</CardTitle>
                <CardDescription>Last {trendData.length} months</CardDescription>
              </div>
              <Tabs value={range} onValueChange={(value) => setRange(value as string)}>
                <TabsList>
                  <TabsTrigger value="3m">3M</TabsTrigger>
                  <TabsTrigger value="6m">6M</TabsTrigger>
                  <TabsTrigger value="12m">1Y</TabsTrigger>
                </TabsList>
              </Tabs>
            </CardHeader>
            <CardContent>
              <NoSSR>
                <ResponsiveContainer width="100%" height={280}>
                  <AreaChart data={trendData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                    <defs>
                      <linearGradient id="netWorthFill" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="var(--color-chart-1)" stopOpacity={0.35} />
                        <stop offset="100%" stopColor="var(--color-chart-1)" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
                    <XAxis
                      dataKey="month"
                      stroke="var(--color-muted-foreground)"
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                    />
                    <YAxis
                      tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
                      stroke="var(--color-muted-foreground)"
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                      width={56}
                    />
                    <Tooltip
                      formatter={(v) => formatCurrency(v as number)}
                      contentStyle={{
                        background: 'var(--color-card)',
                        border: '1px solid var(--color-border)',
                        borderRadius: '8px',
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="netWorth"
                      stroke="var(--color-chart-1)"
                      strokeWidth={2}
                      fill="url(#netWorthFill)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </NoSSR>
            </CardContent>
          </Card>

          {/* Goals */}
          <section>
            <h2 className="text-lg font-semibold mb-4">Goals</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {GOALS.map((goal) => {
                const pct = Math.min(100, Math.round((goal.current / goal.target) * 100));
                return (
                  <Card key={goal.id}>
                    <CardContent className="pt-4 space-y-3">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium">{goal.label}</p>
                        <p className="text-xs text-muted-foreground">by {goal.targetDate}</p>
                      </div>
                      <div className="h-2 rounded-full bg-muted overflow-hidden">
                        <div className="h-full rounded-full bg-primary transition-all" style={{ width: `${pct}%` }} />
                      </div>
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>{formatCurrency(goal.current)} saved</span>
                        <span>
                          {pct}% of {formatCurrency(goal.target)}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
