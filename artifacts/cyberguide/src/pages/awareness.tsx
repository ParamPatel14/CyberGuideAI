import { useGetAwarenessData } from "@workspace/api-client-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShieldAlert, TrendingUp, AlertTriangle, ShieldCheck, Activity, Info } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip } from "recharts";
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "framer-motion";

export default function Awareness() {
  const { data, isLoading, isError } = useGetAwarenessData();

  if (isLoading) {
    return (
      <div className="container max-w-6xl mx-auto py-8 px-4 space-y-6">
        <Skeleton className="h-12 w-64 mb-8" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Skeleton className="h-32 rounded-xl" />
          <Skeleton className="h-32 rounded-xl" />
          <Skeleton className="h-32 rounded-xl" />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Skeleton className="h-[400px] rounded-xl" />
          <Skeleton className="h-[400px] rounded-xl" />
        </div>
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="flex items-center justify-center h-full min-h-[500px]">
        <div className="text-center text-destructive">Failed to load threat intel data.</div>
      </div>
    );
  }

  const COLORS = ['#0ea5e9', '#ef4444', '#f59e0b', '#10b981', '#8b5cf6', '#64748b'];

  return (
    <div className="container max-w-6xl mx-auto py-8 px-4 space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
          <Activity className="w-8 h-8 text-primary" />
          Threat Intelligence
        </h1>
        <p className="text-muted-foreground mt-1">Live dashboard monitoring current cyber fraud trends and metrics.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-card/40 backdrop-blur border-border/50">
          <CardContent className="p-6">
            <p className="text-sm font-medium text-muted-foreground mb-1">Total Reported</p>
            <p className="text-3xl font-bold text-foreground">{data.statistics.totalCasesReported.toLocaleString()}</p>
          </CardContent>
        </Card>
        <Card className="bg-card/40 backdrop-blur border-border/50">
          <CardContent className="p-6">
            <p className="text-sm font-medium text-muted-foreground mb-1">Estimated Losses</p>
            <p className="text-3xl font-bold text-destructive">₹{data.statistics.totalAmountLost.toLocaleString()}</p>
          </CardContent>
        </Card>
        <Card className="bg-card/40 backdrop-blur border-border/50">
          <CardContent className="p-6">
            <p className="text-sm font-medium text-muted-foreground mb-1">Recovery Rate</p>
            <p className="text-3xl font-bold text-primary">{data.statistics.recoveryRate}%</p>
          </CardContent>
        </Card>
        <Card className="bg-card/40 backdrop-blur border-border/50">
          <CardContent className="p-6">
            <p className="text-sm font-medium text-muted-foreground mb-1">Primary Threat</p>
            <p className="text-xl font-bold text-orange-500 truncate">{data.statistics.mostCommonFraudType}</p>
          </CardContent>
        </Card>
      </div>

      {data.alertCards.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-amber-500" /> Active Alerts
          </h2>
          <div className="grid gap-4 md:grid-cols-2">
            {data.alertCards.map((alert) => (
              <Card key={alert.id} className={`border-l-4 ${alert.severity === 'CRITICAL' ? 'border-l-destructive bg-destructive/5' : 'border-l-amber-500 bg-amber-500/5'} border-y-border/50 border-r-border/50`}>
                <CardHeader className="pb-2 flex flex-row items-start justify-between">
                  <CardTitle className="text-lg">{alert.title}</CardTitle>
                  <Badge variant="outline" className={alert.severity === 'CRITICAL' ? 'text-destructive border-destructive' : 'text-amber-500 border-amber-500'}>
                    {alert.severity}
                  </Badge>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-foreground/80">{alert.message}</p>
                  <p className="text-xs text-muted-foreground mt-2">{alert.date}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="bg-card/40 backdrop-blur border-border/50">
          <CardHeader>
            <CardTitle className="text-xl flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary" /> Trending Scams
            </CardTitle>
          </CardHeader>
          <CardContent className="px-0">
            <div className="divide-y divide-border/50">
              {data.trendingScams.map((scam, i) => (
                <div key={i} className="p-4 hover:bg-muted/50 transition-colors">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-foreground">{scam.name}</h3>
                    <Badge variant="secondary" className={`
                      ${scam.trend === 'RISING' ? 'text-destructive bg-destructive/10' : ''}
                      ${scam.trend === 'DECLINING' ? 'text-green-500 bg-green-500/10' : ''}
                    `}>
                      {scam.trend}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">{scam.description}</p>
                  <div className="flex items-center gap-4 text-xs font-medium">
                    <span className="text-destructive">Risk: {scam.riskLevel}</span>
                    <span className="text-primary">{scam.reportedCases} cases</span>
                    {scam.targetGroup && <span className="text-foreground/70">Targets: {scam.targetGroup}</span>}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="space-y-8">
          <Card className="bg-card/40 backdrop-blur border-border/50">
            <CardHeader>
              <CardTitle className="text-xl">Distribution by Category</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={data.categories}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={2}
                      dataKey="count"
                      nameKey="name"
                      stroke="none"
                    >
                      {data.categories.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <RechartsTooltip 
                      contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))', borderRadius: '8px' }}
                      itemStyle={{ color: 'hsl(var(--foreground))' }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex flex-wrap gap-4 justify-center mt-4">
                {data.categories.map((cat, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[i % COLORS.length] }} />
                    <span className="text-foreground/80">{cat.name} ({cat.percentage}%)</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-primary/5 border-primary/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2 text-primary">
                <ShieldCheck className="w-5 h-5" /> Prevention Advice
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {data.preventionTips.slice(0, 3).map(tip => (
                  <li key={tip.id} className="text-sm">
                    <span className="font-semibold text-foreground">{tip.title}: </span>
                    <span className="text-muted-foreground">{tip.description}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}