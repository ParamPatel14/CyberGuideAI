import { useState } from "react";
import { useGetGuidance } from "@workspace/api-client-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, PhoneCall, ShieldAlert, Activity, Loader2, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";

const FRAUD_TYPES = [
  "UPI Fraud", "Phishing", "Investment Scam", "Romance Scam", 
  "Job Fraud", "Lottery Scam", "Tech Support Scam", "Social Media Hack", 
  "Credit/Debit Card Fraud", "KYC Fraud", "OTP Fraud", "Fake E-commerce"
];

function UrgencyBadge({ level }: { level: string }) {
  let color = "bg-primary/20 text-primary border-primary/30";
  if (level === "IMMEDIATE") color = "bg-destructive/20 text-destructive border-destructive/30 animate-pulse";
  if (level === "HIGH") color = "bg-orange-500/20 text-orange-500 border-orange-500/30";
  if (level === "MEDIUM") color = "bg-amber-500/20 text-amber-500 border-amber-500/30";
  if (level === "LOW") color = "bg-blue-500/20 text-blue-500 border-blue-500/30";

  return <Badge variant="outline" className={`px-2 text-[10px] uppercase font-bold tracking-wider ${color}`}>{level}</Badge>;
}

export default function Emergency() {
  const [fraudType, setFraudType] = useState("");
  const [amountLost, setAmountLost] = useState("");
  const getGuidance = useGetGuidance();

  const handleGenerate = () => {
    if (!fraudType) return;
    getGuidance.mutate({
      data: {
        fraudType,
        amountLost: amountLost ? Number(amountLost) : undefined
      }
    });
  };

  const result = getGuidance.data;

  return (
    <div className="container max-w-5xl mx-auto py-8 px-4 space-y-8">
      <div className="flex flex-col md:flex-row gap-6 items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-destructive flex items-center gap-2">
            <AlertTriangle className="w-8 h-8" />
            Emergency Protocol
          </h1>
          <p className="text-muted-foreground mt-1">Get immediate, step-by-step actions based on your specific situation.</p>
        </div>
      </div>

      <Card className="border-border/50 bg-card/40 backdrop-blur">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Incident Type</label>
              <Select value={fraudType} onValueChange={setFraudType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  {FRAUD_TYPES.map(type => (
                    <SelectItem key={type} value={type}>{type}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Amount Lost (Optional)</label>
              <Input 
                type="number" 
                placeholder="e.g. 5000" 
                value={amountLost} 
                onChange={(e) => setAmountLost(e.target.value)} 
              />
            </div>
            <Button 
              className="w-full font-bold h-10" 
              onClick={handleGenerate}
              disabled={!fraudType || getGuidance.isPending}
            >
              {getGuidance.isPending ? (
                <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Generating...</>
              ) : (
                <><Activity className="w-4 h-4 mr-2" /> Load Protocol</>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {getGuidance.isError && (
        <div className="p-4 rounded-md bg-destructive/10 text-destructive border border-destructive/20 text-sm flex items-center gap-2">
          <AlertTriangle className="w-4 h-4" />
          Failed to generate emergency guidance. Please try again.
        </div>
      )}

      {result && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-xl font-bold border-b border-border/50 pb-2">Immediate Steps</h2>
            <div className="space-y-4">
              {result.emergencySteps.map((step, idx) => (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  key={idx}
                >
                  <Card className={`border-l-4 ${step.urgency === 'IMMEDIATE' ? 'border-l-destructive bg-destructive/5' : 'border-l-primary bg-card/40'}`}>
                    <CardHeader className="pb-2 flex flex-row items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-background border border-border text-sm font-bold">
                          {step.order}
                        </div>
                        <CardTitle className="text-lg">{step.title}</CardTitle>
                      </div>
                      <UrgencyBadge level={step.urgency} />
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{step.description}</p>
                      {step.helpline && (
                        <div className="mt-4 inline-flex items-center gap-2 text-sm font-semibold bg-background border border-border px-3 py-1.5 rounded-md text-foreground">
                          <PhoneCall className="w-4 h-4 text-primary" />
                          Call: {step.helpline}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {result.nextSteps.length > 0 && (
              <div className="mt-8">
                <h2 className="text-xl font-bold border-b border-border/50 pb-2 mb-4">Follow-up Actions</h2>
                <ul className="space-y-3">
                  {result.nextSteps.map((step, idx) => (
                    <li key={idx} className="flex items-start gap-3 p-3 rounded-lg bg-card/30 border border-border/30">
                      <ArrowRight className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                      <span className="text-foreground/80">{step}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div className="space-y-6">
            <h2 className="text-xl font-bold border-b border-border/50 pb-2">Critical Contacts</h2>
            <div className="space-y-4">
              {result.helplines.map((helpline, idx) => (
                <Card key={idx} className="bg-card/40 border-border/50">
                  <CardContent className="p-4">
                    <h3 className="font-bold text-lg">{helpline.name}</h3>
                    <div className="text-2xl font-mono font-bold text-primary my-2 tracking-wider">
                      {helpline.number}
                    </div>
                    <p className="text-xs text-muted-foreground mb-2">Available: {helpline.availability}</p>
                    {helpline.description && <p className="text-sm text-foreground/80">{helpline.description}</p>}
                  </CardContent>
                </Card>
              ))}
            </div>

            {result.importantWarnings && result.importantWarnings.length > 0 && (
              <div className="mt-8 p-5 bg-amber-500/10 border border-amber-500/20 rounded-xl space-y-3">
                <h3 className="font-bold text-amber-500 flex items-center gap-2">
                  <ShieldAlert className="w-5 h-5" />
                  Important Warnings
                </h3>
                <ul className="space-y-2">
                  {result.importantWarnings.map((warning, idx) => (
                    <li key={idx} className="text-sm text-amber-500/90 leading-relaxed flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0 mt-1.5" />
                      {warning}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}