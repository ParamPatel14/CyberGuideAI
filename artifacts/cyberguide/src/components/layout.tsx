import { ReactNode } from "react";
import { Link, useLocation } from "wouter";
import {
  ShieldAlert,
  Home,
  FileWarning,
  ActivitySquare,
  AlertTriangle,
  ClipboardCheck,
  FileText,
  Scan,
  TrendingUp,
  Info,
  Menu
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

interface NavItemProps {
  href: string;
  icon: ReactNode;
  label: string;
  isActive: boolean;
}

function NavItem({ href, icon, label, isActive }: NavItemProps) {
  return (
    <Link href={href} className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${isActive ? "bg-primary/10 text-primary font-medium" : "text-muted-foreground hover:text-foreground hover:bg-muted"}`}>
      {icon}
      <span>{label}</span>
    </Link>
  );
}

const navItems = [
  { href: "/", icon: <Home className="w-5 h-5" />, label: "Command Center" },
  { href: "/report", icon: <FileWarning className="w-5 h-5" />, label: "Report Incident" },
  { href: "/analysis", icon: <ActivitySquare className="w-5 h-5" />, label: "Analysis" },
  { href: "/emergency", icon: <AlertTriangle className="w-5 h-5" />, label: "Emergency Actions" },
  { href: "/checklist", icon: <ClipboardCheck className="w-5 h-5" />, label: "Evidence Checklist" },
  { href: "/complaint", icon: <FileText className="w-5 h-5" />, label: "Draft Complaint" },
  { href: "/ocr", icon: <Scan className="w-5 h-5" />, label: "Scan Evidence" },
  { href: "/awareness", icon: <TrendingUp className="w-5 h-5" />, label: "Threat Intel" },
  { href: "/about", icon: <Info className="w-5 h-5" />, label: "About" },
];

export function Layout({ children }: { children: ReactNode }) {
  const [location] = useLocation();

  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-card/50 backdrop-blur-xl border-r border-border">
      <div className="p-6 flex items-center gap-3 border-b border-border/50">
        <ShieldAlert className="w-8 h-8 text-primary" />
        <div>
          <h1 className="font-bold text-lg leading-tight tracking-tight">CyberGuide AI</h1>
          <p className="text-xs text-muted-foreground uppercase tracking-widest">Defense Protocol</p>
        </div>
      </div>
      <nav className="flex-1 overflow-y-auto p-4 space-y-1">
        {navItems.map((item) => (
          <NavItem key={item.href} {...item} isActive={location === item.href} />
        ))}
      </nav>
      <div className="p-4 border-t border-border/50 text-xs text-muted-foreground text-center">
        Vigilance is Security
      </div>
    </div>
  );

  return (
    <div className="flex h-screen w-full overflow-hidden bg-background text-foreground">
      <aside className="hidden md:block w-64 h-full shrink-0">
        <SidebarContent />
      </aside>
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        <header className="md:hidden h-16 border-b border-border bg-card/80 backdrop-blur-md flex items-center px-4 shrink-0 z-10 sticky top-0">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="mr-3">
                <Menu className="w-5 h-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0 w-64 border-r-0 bg-transparent shadow-none">
              <SidebarContent />
            </SheetContent>
          </Sheet>
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-6 h-6 text-primary" />
            <span className="font-bold tracking-tight">CyberGuide AI</span>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto relative z-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/5 via-background to-background pointer-events-none -z-10" />
          <div className="h-full">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}