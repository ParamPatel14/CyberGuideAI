import { useState } from "react";
import { useGetDocumentChecklist } from "@workspace/api-client-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { ClipboardCheck, Loader2, Info } from "lucide-react";
import { motion } from "framer-motion";

const FRAUD_TYPES = [
  "UPI Fraud", "Phishing", "Investment Scam", "Romance Scam", 
  "Job Fraud", "Lottery Scam", "Tech Support Scam", "Social Media Hack", 
  "Credit/Debit Card Fraud", "KYC Fraud", "OTP Fraud", "Fake E-commerce"
];

const CATEGORY_COLORS: Record<string, string> = {
  FINANCIAL: "bg-green-500/10 text-green-500 border-green-500/20",
  DIGITAL: "bg-blue-500/10 text-blue-500 border-blue-500/20",
  IDENTITY: "bg-purple-500/10 text-purple-500 border-purple-500/20",
  COMMUNICATION: "bg-orange-500/10 text-orange-500 border-orange-500/20",
  LEGAL: "bg-red-500/10 text-red-500 border-red-500/20",
};

export default function Checklist() {
  const [fraudType, setFraudType] = useState("");
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});
  const getChecklist = useGetDocumentChecklist();

  const handleGenerate = () => {
    if (!fraudType) return;
    getChecklist.mutate({
      data: { fraudType }
    });
    setCheckedItems({});
  };

  const toggleCheck = (id: string) => {
    setCheckedItems(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const result = getChecklist.data;

  // Group checklist by category
  const groupedChecklist = result?.checklist.reduce((acc, item) => {
    if (!acc[item.category]) acc[item.category] = [];
    acc[item.category].push(item);
    return acc;
  }, {} as Record<string, typeof result.checklist>) || {};

  const totalItems = result?.checklist.length || 0;
  const completedItems = Object.values(checkedItems).filter(Boolean).length;
  const progress = totalItems === 0 ? 0 : Math.round((completedItems / totalItems) * 100);

  return (
    <div className="container max-w-4xl mx-auto py-8 px-4 space-y-8">
      <div className="flex flex-col md:flex-row gap-6 items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <ClipboardCheck className="w-8 h-8 text-primary" />
            Evidence Collection
          </h1>
          <p className="text-muted-foreground mt-1">Gather the necessary documents before filing a complaint.</p>
        </div>
      </div>

      <Card className="border-border/50 bg-card/40 backdrop-blur">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4 items-end">
            <div className="space-y-2 flex-1">
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
            <Button 
              className="w-full sm:w-auto font-bold h-10 px-8" 
              onClick={handleGenerate}
              disabled={!fraudType || getChecklist.isPending}
            >
              {getChecklist.isPending ? (
                <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Generating...</>
              ) : "Generate Checklist"}
            </Button>
          </div>
        </CardContent>
      </Card>

      {result && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
          
          <div className="sticky top-16 z-20 bg-background/80 backdrop-blur-xl border-b border-border/50 p-4 -mx-4 sm:mx-0 sm:rounded-xl sm:border flex items-center justify-between gap-4">
            <div className="flex flex-col w-full">
              <div className="flex justify-between mb-1 text-sm font-medium">
                <span>Collection Progress</span>
                <span className="text-primary">{progress}%</span>
              </div>
              <div className="w-full bg-secondary rounded-full h-2.5">
                <div 
                  className="bg-primary h-2.5 rounded-full transition-all duration-500 ease-out" 
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </div>

          {result.priorityDocuments.length > 0 && (
            <Card className="border-primary/30 bg-primary/5">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg text-primary">Priority Documents</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-5 space-y-1 text-sm text-foreground/90">
                  {result.priorityDocuments.map((doc, i) => (
                    <li key={i}>{doc}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}

          <div className="space-y-8">
            {Object.entries(groupedChecklist).map(([category, items], idx) => (
              <div key={category} className="space-y-4">
                <h3 className="text-lg font-bold uppercase tracking-wider flex items-center gap-3">
                  {category}
                  <div className="h-px bg-border/50 flex-1" />
                </h3>
                <div className="grid gap-3">
                  {items.map((item) => (
                    <Card 
                      key={item.id} 
                      className={`transition-colors duration-200 border-border/50 cursor-pointer hover:border-primary/30 ${checkedItems[item.id] ? 'bg-primary/5 border-primary/20' : 'bg-card/40'}`}
                      onClick={() => toggleCheck(item.id)}
                    >
                      <CardContent className="p-4 flex gap-4">
                        <div className="mt-1">
                          <Checkbox 
                            checked={checkedItems[item.id] || false} 
                            onCheckedChange={() => toggleCheck(item.id)}
                            className="w-5 h-5 rounded-md border-2"
                          />
                        </div>
                        <div className="flex-1 space-y-1">
                          <div className="flex items-start justify-between gap-2">
                            <label className={`font-semibold cursor-pointer select-none transition-colors ${checkedItems[item.id] ? 'text-primary line-through opacity-70' : 'text-foreground'}`}>
                              {item.title}
                            </label>
                            <div className="flex items-center gap-2">
                              {item.required && <Badge variant="destructive" className="text-[10px] px-1.5 py-0">REQUIRED</Badge>}
                              <Badge variant="outline" className={`text-[10px] px-1.5 py-0 ${CATEGORY_COLORS[item.category] || ''}`}>{item.category}</Badge>
                            </div>
                          </div>
                          <p className={`text-sm transition-opacity ${checkedItems[item.id] ? 'text-muted-foreground opacity-50' : 'text-muted-foreground'}`}>
                            {item.description}
                          </p>
                          {item.tips && !checkedItems[item.id] && (
                            <div className="mt-3 flex items-start gap-2 text-xs bg-muted/50 p-2 rounded text-foreground/80">
                              <Info className="w-4 h-4 text-primary shrink-0" />
                              <span>{item.tips}</span>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {result.additionalNotes && (
            <div className="p-4 rounded-lg bg-card/50 border border-border/50 text-sm text-muted-foreground">
              <strong>Note:</strong> {result.additionalNotes}
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
}