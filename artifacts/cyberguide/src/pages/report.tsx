import { useState } from "react";
import { useLocation } from "wouter";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useAnalyzeFraud } from "@workspace/api-client-react";
import { useAnalysis } from "@/context/AnalysisContext";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, ShieldAlert, Loader2 } from "lucide-react";

const FRAUD_TYPES = [
  "UPI Fraud", "Phishing", "Investment Scam", "Romance Scam", 
  "Job Fraud", "Lottery Scam", "Tech Support Scam", "Social Media Hack", 
  "Credit/Debit Card Fraud", "KYC Fraud", "OTP Fraud", "Fake E-commerce"
];

const PAYMENT_METHODS = [
  "UPI", "Net Banking", "Credit Card", "Debit Card", "Wallet", "Cash", "Cryptocurrency"
];

const formSchema = z.object({
  fraudType: z.string().min(1, "Fraud type is required"),
  amountLost: z.coerce.number().optional(),
  transactionMethod: z.string().optional(),
  incidentDate: z.string().optional(),
  bankName: z.string().optional(),
  upiId: z.string().optional(),
  phoneNumber: z.string().optional(),
  description: z.string().min(10, "Please provide at least 10 characters describing the incident"),
  hoursElapsed: z.coerce.number().optional()
});

export default function Report() {
  const [, setLocation] = useLocation();
  const { setAnalysisResult } = useAnalysis();
  const analyzeFraud = useAnalyzeFraud();
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fraudType: "",
      amountLost: undefined,
      transactionMethod: "",
      incidentDate: "",
      bankName: "",
      upiId: "",
      phoneNumber: "",
      description: "",
      hoursElapsed: undefined,
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    analyzeFraud.mutate(
      { data: values },
      {
        onSuccess: (data) => {
          setAnalysisResult(data);
          setLocation("/analysis");
        },
      }
    );
  };

  return (
    <div className="container max-w-3xl mx-auto py-8 px-4">
      <Card className="border-primary/20 bg-card/40 backdrop-blur">
        <CardHeader>
          <div className="flex items-center gap-3 mb-2">
            <ShieldAlert className="w-8 h-8 text-primary" />
            <CardTitle className="text-2xl">Incident Report Form</CardTitle>
          </div>
          <CardDescription>
            Provide details of the suspected cyber fraud. This data will be securely analyzed 
            by our AI to generate an immediate response strategy.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="fraudType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Incident Category</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select fraud type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {FRAUD_TYPES.map(type => (
                            <SelectItem key={type} value={type}>{type}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="transactionMethod"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Payment Method</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select method" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {PAYMENT_METHODS.map(method => (
                            <SelectItem key={method} value={method}>{method}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="amountLost"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Amount Lost (Optional)</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="e.g. 50000" {...field} value={field.value ?? ""} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="hoursElapsed"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Hours Elapsed (Approx)</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="e.g. 2" {...field} value={field.value ?? ""} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Detailed Description</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Describe how it happened in detail..." 
                        className="min-h-[120px]"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button 
                type="submit" 
                className="w-full h-12 text-lg" 
                disabled={analyzeFraud.isPending}
              >
                {analyzeFraud.isPending ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Analyzing Incident...
                  </>
                ) : (
                  <>
                    <Activity className="mr-2 h-5 w-5" />
                    Submit for AI Analysis
                  </>
                )}
              </Button>

              {analyzeFraud.isError && (
                <div className="p-4 rounded-md bg-destructive/10 text-destructive border border-destructive/20 text-sm">
                  An error occurred while analyzing the report. Please try again.
                </div>
              )}
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}