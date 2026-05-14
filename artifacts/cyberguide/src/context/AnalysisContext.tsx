import { createContext, useContext, useState, ReactNode } from "react";
import type { FraudAnalysis } from "@workspace/api-client-react";

interface AnalysisContextType {
  analysisResult: FraudAnalysis | null;
  setAnalysisResult: (result: FraudAnalysis | null) => void;
}

const AnalysisContext = createContext<AnalysisContextType | undefined>(undefined);

export function AnalysisProvider({ children }: { children: ReactNode }) {
  const [analysisResult, setAnalysisResult] = useState<FraudAnalysis | null>(null);

  return (
    <AnalysisContext.Provider value={{ analysisResult, setAnalysisResult }}>
      {children}
    </AnalysisContext.Provider>
  );
}

export function useAnalysis() {
  const context = useContext(AnalysisContext);
  if (context === undefined) {
    throw new Error("useAnalysis must be used within an AnalysisProvider");
  }
  return context;
}
