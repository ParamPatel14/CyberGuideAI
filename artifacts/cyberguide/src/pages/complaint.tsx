import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useGenerateComplaint } from "@workspace/api-client-react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Loader2, Copy, Download, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

const FRAUD_TYPES = [
  "UPI Fraud", "Phishing", "Investment Scam", "Romance Scam", 
  "Job Fraud", "Lottery Scam", "Tech Support Scam", "Social Media Hack", 
  "Credit/Debit Card Fraud", "KYC Fraud", "OTP Fraud", "Fake E-commerce"
];

const formSchema = z.object({
  fraudType: z.string().min(1, "Fraud type is required"),
  victimName: z.string().min(2, "Name is required"),
  victimAddress: z.string().optional(),
  victimPhone: z.string().optional(),
  incidentDate: z.string().optional(),
  amountLost: z.coerce.number().optional(),
  bankName: z.string().optional(),
  transactionId: z.string().optional(),
  description: z.string().min(10, "Please provide a description"),
});

export default function Complaint() {
  const generateComplaint = useGenerateComplaint();
  const [copiedTab, setCopiedTab] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fraudType: "",
      victimName: "",
      victimAddress: "",
      victimPhone: "",
      incidentDate: "",
      amountLost: undefined,
      bankName: "",
      transactionId: "",
      description: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    generateComplaint.mutate({ data: values });
  };

  const handleCopy = (text: string, tab: string) => {
    navigator.clipboard.writeText(text);
    setCopiedTab(tab);
    setTimeout(() => setCopiedTab(null), 2000);
  };

  const handleDownload = (text: string, filename: string) => {
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  const result = generateComplaint.data;

  return (
    <div className="container max-w-6xl mx-auto py-8 px-4 grid grid-cols-1 lg:grid-cols-12 gap-8">
      <div className="lg:col-span-5 space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <FileText className="w-8 h-8 text-primary" />
            Complaint Generator
          </h1>
          <p className="text-muted-foreground mt-1">Generate formal complaint drafts for Police, Bank, and Cybercrime portals.</p>
        </div>

        <Card className="border-border/50 bg-card/40 backdrop-blur">
          <CardContent className="p-6">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                
                <FormField control={form.control} name="fraudType" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Incident Category</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl><SelectTrigger><SelectValue placeholder="Select type" /></SelectTrigger></FormControl>
                      <SelectContent>
                        {FRAUD_TYPES.map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )} />

                <FormField control={form.control} name="victimName" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Your Full Name</FormLabel>
                    <FormControl><Input placeholder="John Doe" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />

                <div className="grid grid-cols-2 gap-4">
                  <FormField control={form.control} name="victimPhone" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl><Input placeholder="+91..." {...field} value={field.value ?? ""} /></FormControl>
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="incidentDate" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Incident Date</FormLabel>
                      <FormControl><Input type="date" {...field} value={field.value ?? ""} /></FormControl>
                    </FormItem>
                  )} />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <FormField control={form.control} name="amountLost" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Amount Lost</FormLabel>
                      <FormControl><Input type="number" placeholder="0" {...field} value={field.value ?? ""} /></FormControl>
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="bankName" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Bank Name</FormLabel>
                      <FormControl><Input placeholder="SBI / HDFC" {...field} value={field.value ?? ""} /></FormControl>
                    </FormItem>
                  )} />
                </div>

                <FormField control={form.control} name="transactionId" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Transaction ID (if any)</FormLabel>
                    <FormControl><Input placeholder="UTR or Ref No." {...field} value={field.value ?? ""} /></FormControl>
                  </FormItem>
                )} />

                <FormField control={form.control} name="description" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Brief Description</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Explain what happened..." className="h-24" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />

                <Button type="submit" className="w-full" disabled={generateComplaint.isPending}>
                  {generateComplaint.isPending ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Generating Drafts...</> : "Generate Drafts"}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>

      <div className="lg:col-span-7">
        {!result && !generateComplaint.isPending && (
          <div className="h-full min-h-[400px] flex flex-col items-center justify-center text-center p-8 border border-dashed border-border/50 rounded-xl bg-card/10">
            <FileText className="w-12 h-12 text-muted-foreground opacity-50 mb-4" />
            <h3 className="text-lg font-medium">Awaiting Details</h3>
            <p className="text-muted-foreground text-sm max-w-sm mt-2">
              Fill out the form to generate formal complaint drafts tailored to your specific incident.
            </p>
          </div>
        )}

        {generateComplaint.isPending && (
          <div className="h-full min-h-[400px] flex flex-col items-center justify-center text-center p-8 border border-border/50 rounded-xl bg-card/20 backdrop-blur">
            <Loader2 className="w-12 h-12 text-primary animate-spin mb-4" />
            <h3 className="text-lg font-medium">Drafting Complaints</h3>
            <p className="text-muted-foreground text-sm mt-2">AI is structuring formal legal language...</p>
          </div>
        )}

        {result && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
            <Tabs defaultValue="police" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-4 bg-muted/50 p-1">
                <TabsTrigger value="police">Police FIR</TabsTrigger>
                <TabsTrigger value="bank">Bank Letter</TabsTrigger>
                <TabsTrigger value="cyber">Cyber Portal</TabsTrigger>
              </TabsList>
              
              {[
                { id: "police", title: "Police Station Complaint Draft", content: result.firDraft, filename: "police_complaint.txt" },
                { id: "bank", title: "Bank Dispute Draft", content: result.bankComplaintDraft, filename: "bank_dispute.txt" },
                { id: "cyber", title: "Cybercrime Portal Draft", content: result.cybercrimeComplaintDraft, filename: "cybercrime_complaint.txt" }
              ].map(tab => (
                <TabsContent key={tab.id} value={tab.id}>
                  <Card className="border-border/50 bg-card/40 backdrop-blur shadow-xl">
                    <CardHeader className="flex flex-row items-center justify-between pb-3 border-b border-border/30">
                      <CardTitle className="text-base">{tab.title}</CardTitle>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" onClick={() => handleCopy(tab.content, tab.id)} className="h-8">
                          {copiedTab === tab.id ? <CheckCircle2 className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4 mr-2" />}
                          {copiedTab === tab.id ? "Copied" : "Copy"}
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => handleDownload(tab.content, tab.filename)} className="h-8">
                          <Download className="w-4 h-4 mr-2" /> Download
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent className="p-0">
                      <textarea 
                        className="w-full h-[500px] p-6 bg-transparent border-0 focus:ring-0 font-mono text-sm leading-relaxed resize-none text-foreground/90"
                        defaultValue={tab.content}
                        readOnly
                      />
                    </CardContent>
                  </Card>
                </TabsContent>
              ))}
            </Tabs>
          </motion.div>
        )}
      </div>
    </div>
  );
}