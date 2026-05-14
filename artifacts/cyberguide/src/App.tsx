import { AppProps } from "react";
import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import { Layout } from "@/components/layout";
import { AnalysisProvider } from "@/context/AnalysisContext";

import Home from "@/pages/home";
import Report from "@/pages/report";
import Analysis from "@/pages/analysis";
import Emergency from "@/pages/emergency";
import Checklist from "@/pages/checklist";
import Complaint from "@/pages/complaint";
import OCR from "@/pages/ocr";
import Awareness from "@/pages/awareness";
import About from "@/pages/about";

const queryClient = new QueryClient();

function Router() {
  return (
    <Layout>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/report" component={Report} />
        <Route path="/analysis" component={Analysis} />
        <Route path="/emergency" component={Emergency} />
        <Route path="/checklist" component={Checklist} />
        <Route path="/complaint" component={Complaint} />
        <Route path="/ocr" component={OCR} />
        <Route path="/awareness" component={Awareness} />
        <Route path="/about" component={About} />
        <Route component={NotFound} />
      </Switch>
    </Layout>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AnalysisProvider>
        <TooltipProvider>
          <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
            <Router />
          </WouterRouter>
          <Toaster />
        </TooltipProvider>
      </AnalysisProvider>
    </QueryClientProvider>
  );
}

export default App;