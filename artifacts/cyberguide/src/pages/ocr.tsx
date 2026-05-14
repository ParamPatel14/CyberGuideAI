import { useState, useRef } from "react";
import { useScanEvidence } from "@workspace/api-client-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Scan, UploadCloud, FileImage, Loader2, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function OCR() {
  const [image, setImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const scanEvidence = useScanEvidence();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        setImage(base64);
        scanEvidence.mutate({ data: { imageBase64: base64 } });
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => fileInputRef.current?.click();

  const result = scanEvidence.data;

  const renderEntityGroup = (title: string, items?: string[]) => {
    if (!items || items.length === 0) return null;
    return (
      <div className="space-y-2">
        <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">{title}</h4>
        <div className="flex flex-wrap gap-2">
          {items.map((item, idx) => (
            <Badge key={idx} variant="secondary" className="px-3 py-1 font-mono text-sm bg-primary/10 text-primary border-primary/20">
              {item}
            </Badge>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="container max-w-5xl mx-auto py-8 px-4 space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
          <Scan className="w-8 h-8 text-primary" />
          Evidence Scanner
        </h1>
        <p className="text-muted-foreground mt-1">Upload screenshots of transactions, chats, or emails to extract key entities automatically.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Upload Section */}
        <Card className="border-border/50 bg-card/40 backdrop-blur overflow-hidden h-[400px] flex flex-col">
          <CardHeader className="bg-muted/30 border-b border-border/50">
            <CardTitle className="text-lg flex items-center justify-between">
              Upload Image
              {image && (
                <Button variant="ghost" size="sm" onClick={() => setImage(null)} className="h-8">
                  Clear
                </Button>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-1 p-0 relative">
            <input 
              type="file" 
              accept="image/*" 
              className="hidden" 
              ref={fileInputRef} 
              onChange={handleFileChange}
            />
            
            {!image ? (
              <div 
                onClick={triggerFileInput}
                className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center cursor-pointer hover:bg-card/60 transition-colors group"
              >
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <UploadCloud className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-medium text-lg">Click to Upload Screenshot</h3>
                <p className="text-sm text-muted-foreground mt-2 max-w-xs">
                  Supports JPG, PNG formats. Best for UPI receipts, SMS alerts, and chat logs.
                </p>
              </div>
            ) : (
              <div className="absolute inset-0 bg-black/50 p-4">
                <img src={image} alt="Evidence" className="w-full h-full object-contain" />
              </div>
            )}
          </CardContent>
        </Card>

        {/* Results Section */}
        <Card className="border-border/50 bg-card/40 backdrop-blur h-[400px] flex flex-col">
          <CardHeader className="bg-muted/30 border-b border-border/50">
            <CardTitle className="text-lg flex items-center justify-between">
              Extracted Data
              {result && <Badge className="bg-green-500/20 text-green-500 border-green-500/30">Match Confidence: {result.confidence}%</Badge>}
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-1 overflow-y-auto p-6">
            <AnimatePresence mode="wait">
              {!image && !scanEvidence.isPending && (
                <motion.div 
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="h-full flex flex-col items-center justify-center text-center text-muted-foreground"
                >
                  <Scan className="w-12 h-12 opacity-20 mb-4" />
                  <p>Awaiting image upload...</p>
                </motion.div>
              )}

              {scanEvidence.isPending && (
                <motion.div 
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="h-full flex flex-col items-center justify-center text-center"
                >
                  <div className="relative">
                    <Scan className="w-16 h-16 text-primary/30" />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/50 to-transparent w-full h-2 animate-[scan_2s_ease-in-out_infinite]" />
                  </div>
                  <p className="mt-4 font-medium animate-pulse text-primary">Running optical character recognition...</p>
                </motion.div>
              )}

              {result && !scanEvidence.isPending && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                  className="space-y-6"
                >
                  {renderEntityGroup("Transaction IDs / UTRs", result.detectedEntities.transactionIds)}
                  {renderEntityGroup("Bank Names", result.detectedEntities.bankNames)}
                  {renderEntityGroup("UPI IDs", result.detectedEntities.upiIds)}
                  {renderEntityGroup("Amounts", result.detectedEntities.amounts)}
                  {renderEntityGroup("Phone Numbers", result.detectedEntities.phoneNumbers)}
                  {renderEntityGroup("Timestamps", result.detectedEntities.timestamps)}

                  {Object.values(result.detectedEntities).every(arr => !arr || arr.length === 0) && (
                    <div className="p-4 border border-amber-500/30 bg-amber-500/10 rounded-lg text-amber-500 text-sm text-center">
                      No entities detected. Try uploading a clearer image or a different screenshot.
                    </div>
                  )}

                  {result.extractedText && (
                    <div className="pt-4 border-t border-border/50">
                      <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Raw Text Dump</h4>
                      <div className="p-3 bg-muted/50 rounded-md font-mono text-xs text-foreground/70 whitespace-pre-wrap max-h-32 overflow-y-auto">
                        {result.extractedText}
                      </div>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}