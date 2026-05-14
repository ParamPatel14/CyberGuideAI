import { ShieldAlert, Mail, MapPin } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function About() {
  return (
    <div className="container max-w-4xl mx-auto py-12 px-4 space-y-12">
      <div className="text-center space-y-4">
        <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <ShieldAlert className="w-10 h-10 text-primary" />
        </div>
        <h1 className="text-4xl font-bold tracking-tight">About CyberGuide AI</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          A definitive, AI-driven protocol for cyber fraud response. Built to provide clarity, authority, and immediate action when seconds matter.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold border-b border-border/50 pb-2">The Mission</h2>
          <p className="text-muted-foreground leading-relaxed">
            In the immediate aftermath of cyber fraud, victims face panic, confusion, and a complex bureaucratic landscape. CyberGuide AI was engineered to cut through the noise. We transform panic into protocol.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            By analyzing incident specifics in real-time, the system dictates exact emergency actions, generates legal complaint drafts, and extracts crucial evidence from screenshots. We believe rapid, structured response is the key to recovery.
          </p>
        </div>

        <div className="space-y-6">
          <h2 className="text-2xl font-semibold border-b border-border/50 pb-2">Contact & Operations</h2>
          <Card className="bg-card/40 backdrop-blur border-border/50">
            <CardContent className="p-6 space-y-4">
              <div className="flex items-center gap-3 text-foreground/80">
                <ShieldAlert className="w-5 h-5 text-primary shrink-0" />
                <span>National Helpline: <strong className="text-foreground tracking-widest text-lg ml-2">1930</strong></span>
              </div>
              <div className="flex items-center gap-3 text-foreground/80">
                <Mail className="w-5 h-5 text-primary shrink-0" />
                <span>cybercell@gov.example</span>
              </div>
              <div className="flex items-center gap-3 text-foreground/80">
                <MapPin className="w-5 h-5 text-primary shrink-0" />
                <span>Digital Defense Operations Center</span>
              </div>
            </CardContent>
          </Card>
          
          <div className="p-4 rounded-lg bg-muted/50 border border-border/50 text-sm text-muted-foreground italic">
            Disclaimer: CyberGuide AI provides automated intelligence and structural assistance. It does not replace formal legal counsel or direct law enforcement intervention.
          </div>
        </div>
      </div>
    </div>
  );
}