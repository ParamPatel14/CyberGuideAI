import { Link } from "wouter";
import { ShieldAlert, Activity, ArrowRight, ShieldCheck, FileWarning, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="container max-w-6xl mx-auto py-12 px-4 space-y-12">
      <section className="relative rounded-2xl overflow-hidden border border-border/50 bg-card/30 backdrop-blur-sm p-8 md:p-12 text-center md:text-left flex flex-col md:flex-row items-center gap-8">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-primary/20 rounded-full blur-3xl pointer-events-none" />
        
        <div className="flex-1 space-y-6 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-destructive/10 text-destructive border border-destructive/20 text-sm font-medium">
            <ShieldAlert className="w-4 h-4" />
            <span>Under Cyber Attack? Act Now.</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight">
            Your Digital <span className="text-primary">Defense</span> Protocol
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            CyberGuide AI provides immediate, authoritative guidance for victims of cyber fraud. 
            Analyze your situation, generate emergency checklists, and start recovery.
          </p>
          <div className="flex flex-wrap items-center gap-4 justify-center md:justify-start">
            <Link href="/report">
              <Button size="lg" className="h-12 px-8 font-semibold shadow-[0_0_20px_-5px_rgba(var(--primary),0.5)]">
                <FileWarning className="w-5 h-5 mr-2" />
                Report Incident
              </Button>
            </Link>
            <Link href="/emergency">
              <Button size="lg" variant="outline" className="h-12 px-8 border-destructive/30 text-destructive hover:bg-destructive/10">
                <Activity className="w-5 h-5 mr-2" />
                Emergency Actions
              </Button>
            </Link>
          </div>
        </div>
        
        <div className="w-full md:w-1/3 flex justify-center z-10">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="w-48 h-48 md:w-64 md:h-64 rounded-full border border-primary/30 flex items-center justify-center bg-card/50 backdrop-blur-md relative"
          >
            <div className="absolute inset-0 rounded-full border border-primary/20 animate-[spin_10s_linear_infinite]" />
            <div className="absolute inset-4 rounded-full border border-primary/10 animate-[spin_15s_linear_infinite_reverse]" />
            <ShieldCheck className="w-24 h-24 text-primary" />
          </motion.div>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          {
            title: "AI Analysis",
            description: "Submit details to receive immediate threat classification and recovery probability.",
            icon: <Activity className="w-6 h-6 text-primary" />,
            href: "/analysis"
          },
          {
            title: "Evidence Scanner",
            description: "Extract vital details from screenshots and transaction receipts automatically.",
            icon: <Search className="w-6 h-6 text-primary" />,
            href: "/ocr"
          },
          {
            title: "Threat Intel",
            description: "Stay ahead with live statistics and alerts on trending scam patterns.",
            icon: <ShieldAlert className="w-6 h-6 text-primary" />,
            href: "/awareness"
          }
        ].map((feature, i) => (
          <Link key={i} href={feature.href} className="block group">
            <Card className="h-full bg-card/40 backdrop-blur border-border/50 transition-colors hover:bg-card/60 hover:border-primary/50">
              <CardHeader>
                <div className="mb-4 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  {feature.icon}
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
                <CardDescription className="text-base mt-2">
                  {feature.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center text-sm font-medium text-primary group-hover:underline">
                  Launch Protocol <ArrowRight className="w-4 h-4 ml-1" />
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </section>

      <section className="rounded-xl bg-destructive/10 border border-destructive/20 p-6 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div>
          <h3 className="text-xl font-bold text-foreground flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-destructive" />
            National Cyber Crime Helpline
          </h3>
          <p className="text-muted-foreground mt-1">Dial 1930 immediately to report financial fraud.</p>
        </div>
        <div className="text-3xl font-mono font-bold tracking-widest text-destructive">
          1930
        </div>
      </section>
    </div>
  );
}

import { AlertTriangle } from "lucide-react";