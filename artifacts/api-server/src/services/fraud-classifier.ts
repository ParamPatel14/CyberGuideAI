export type SeverityLevel = "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
export type UrgencyLevel = "IMMEDIATE" | "HIGH" | "MEDIUM" | "LOW";

export interface ActionStep {
  order: number;
  title: string;
  description: string;
  urgency: UrgencyLevel;
  helpline?: string | null;
}

export interface TimelineStep {
  timeframe: string;
  action: string;
  status: "PENDING" | "IN_PROGRESS" | "COMPLETED";
}

export interface FraudAnalysisResult {
  fraudClassification: string;
  severityLevel: SeverityLevel;
  riskIndicators: string[];
  recoveryProbability: number;
  emergencyActions: ActionStep[];
  timelineRoadmap: TimelineStep[];
  preventionAdvice: string[];
  warnings: string[];
  aiGuidance: string;
}

const FRAUD_SEVERITY_MAP: Record<string, SeverityLevel> = {
  "UPI Fraud": "HIGH",
  "Phishing": "HIGH",
  "Investment Scam": "CRITICAL",
  "Romance Scam": "HIGH",
  "Job Fraud": "MEDIUM",
  "Lottery Scam": "MEDIUM",
  "Tech Support Scam": "HIGH",
  "Social Media Hack": "MEDIUM",
  "Credit/Debit Card Fraud": "HIGH",
  "KYC Fraud": "CRITICAL",
  "OTP Fraud": "CRITICAL",
  "Fake E-commerce": "MEDIUM",
};

const FRAUD_RISK_INDICATORS: Record<string, string[]> = {
  "UPI Fraud": [
    "Unauthorized UPI transaction detected",
    "Transaction may have been initiated through social engineering",
    "Funds likely transferred to a mule account",
    "Account credentials may be compromised",
  ],
  "Phishing": [
    "Credentials may have been harvested",
    "Fraudulent website mimicked legitimate service",
    "Personal data exposure risk",
    "Additional accounts using same password at risk",
  ],
  "Investment Scam": [
    "High likelihood of total fund loss",
    "Fraudsters likely operating across multiple victims",
    "Funds may have been moved offshore",
    "Identity theft risk from submitted documents",
  ],
  "OTP Fraud": [
    "OTP shared with unauthorized party",
    "Account takeover risk is high",
    "Linked bank accounts at immediate risk",
    "SIM swap may have been involved",
  ],
  "KYC Fraud": [
    "Identity documents compromised",
    "Multiple accounts may be opened in your name",
    "Credit score risk from fraudulent loans",
    "Aadhaar/PAN misuse detected",
  ],
};

const FRAUD_EMERGENCY_ACTIONS: Record<string, ActionStep[]> = {
  "UPI Fraud": [
    { order: 1, title: "Call National Cybercrime Helpline", description: "Immediately call 1930 — the National Cybercrime Reporting Helpline — and report the transaction. The faster you report, the higher the chance of recovery.", urgency: "IMMEDIATE", helpline: "1930" },
    { order: 2, title: "Block Your UPI and Bank Account", description: "Contact your bank immediately and request a temporary freeze on your account. Block the linked UPI ID through your UPI app settings.", urgency: "IMMEDIATE", helpline: null },
    { order: 3, title: "File Complaint at cybercrime.gov.in", description: "Register an online complaint at the National Cyber Crime Reporting Portal with transaction details, UTR number, and screenshots.", urgency: "HIGH", helpline: null },
    { order: 4, title: "Email Your Bank's Fraud Team", description: "Send a formal written complaint to your bank's fraud department with all transaction evidence. Request chargeback or reversal.", urgency: "HIGH", helpline: null },
    { order: 5, title: "Preserve All Evidence", description: "Screenshot all transaction records, chat messages, caller details, and any communication with the fraudster. Do not delete anything.", urgency: "MEDIUM", helpline: null },
  ],
  "Phishing": [
    { order: 1, title: "Change All Compromised Passwords Immediately", description: "Change passwords for the affected account and ALL accounts using the same password. Use a unique strong password for each.", urgency: "IMMEDIATE", helpline: null },
    { order: 2, title: "Enable Two-Factor Authentication", description: "Activate 2FA on all important accounts — banking, email, social media — using an authenticator app, not SMS.", urgency: "IMMEDIATE", helpline: null },
    { order: 3, title: "Notify Your Bank", description: "If any financial information was shared, contact your bank immediately to monitor or freeze the account.", urgency: "IMMEDIATE", helpline: null },
    { order: 4, title: "Report the Phishing Site", description: "Report the fraudulent website to cybercrime.gov.in and to the legitimate organization being impersonated.", urgency: "HIGH", helpline: null },
    { order: 5, title: "Scan Devices for Malware", description: "Run a full antivirus scan on all devices where you accessed the phishing link. Remove any suspicious software.", urgency: "HIGH", helpline: null },
  ],
  "Investment Scam": [
    { order: 1, title: "Cease All Communication and Payments", description: "Stop all contact with the scammer immediately. Do not send any more money even if threatened or promised returns.", urgency: "IMMEDIATE", helpline: null },
    { order: 2, title: "Report to SEBI and RBI", description: "File complaints with SEBI (Securities and Exchange Board) and RBI if the scam involved investment or cryptocurrency platforms.", urgency: "IMMEDIATE", helpline: "1800-266-7575" },
    { order: 3, title: "File Cybercrime Complaint", description: "Report immediately at cybercrime.gov.in with all payment receipts, communication screenshots, and fraudster's contact details.", urgency: "HIGH", helpline: null },
    { order: 4, title: "Contact Your Bank for Chargeback", description: "If payments were made via card or bank transfer, contact your bank to initiate chargeback proceedings.", urgency: "HIGH", helpline: null },
    { order: 5, title: "Consult a Legal Advisor", description: "Engage a cybercrime attorney to understand your legal options for recovery and potential civil action.", urgency: "MEDIUM", helpline: null },
  ],
};

function getDefaultEmergencyActions(fraudType: string): ActionStep[] {
  return [
    { order: 1, title: "Report to National Cybercrime Helpline", description: `Call 1930 immediately and report the ${fraudType} incident. Note the complaint reference number.`, urgency: "IMMEDIATE", helpline: "1930" },
    { order: 2, title: "Preserve All Evidence", description: "Screenshot all messages, transaction records, and suspect profiles. Do not delete any communication.", urgency: "IMMEDIATE", helpline: null },
    { order: 3, title: "File Online Complaint", description: "Register your complaint at cybercrime.gov.in with all available evidence and details.", urgency: "HIGH", helpline: null },
    { order: 4, title: "Notify Your Bank", description: "Contact your bank's fraud hotline and report any unauthorized transactions or data exposure.", urgency: "HIGH", helpline: null },
    { order: 5, title: "File FIR at Local Police Station", description: "Visit your nearest police station to file a First Information Report with all evidence documents.", urgency: "MEDIUM", helpline: null },
  ];
}

function calculateRecoveryProbability(
  hoursElapsed: number | null | undefined,
  fraudType: string,
  paymentMethod: string | null | undefined
): number {
  let base = 45;

  const hours = hoursElapsed ?? 48;
  if (hours < 1) base += 35;
  else if (hours < 6) base += 25;
  else if (hours < 24) base += 15;
  else if (hours < 48) base += 5;
  else if (hours > 168) base -= 20;

  if (paymentMethod === "UPI" || paymentMethod === "Net Banking") base += 10;
  if (paymentMethod === "Cryptocurrency") base -= 25;

  const highRecovery = ["UPI Fraud", "Credit/Debit Card Fraud"];
  const lowRecovery = ["Investment Scam", "Romance Scam", "Cryptocurrency"];
  if (highRecovery.includes(fraudType)) base += 10;
  if (lowRecovery.includes(fraudType)) base -= 15;

  return Math.min(95, Math.max(5, base));
}

function getTimelineRoadmap(fraudType: string): TimelineStep[] {
  return [
    { timeframe: "Within 1 hour", action: "Call cybercrime helpline 1930 and block compromised accounts", status: "IN_PROGRESS" },
    { timeframe: "Within 24 hours", action: "File complaint at cybercrime.gov.in and notify bank in writing", status: "PENDING" },
    { timeframe: "Within 48 hours", action: "File FIR at local police station with all evidence", status: "PENDING" },
    { timeframe: "Within 1 week", action: "Follow up with bank's fraud department and cybercrime cell", status: "PENDING" },
    { timeframe: "Within 1 month", action: "Receive acknowledgment from cybercrime cell and bank investigation update", status: "PENDING" },
    { timeframe: "1-3 months", action: "Bank investigation outcome and potential fund recovery", status: "PENDING" },
  ];
}

export function analyzeFraud(input: {
  fraudType: string;
  amountLost?: number | null;
  transactionMethod?: string | null;
  incidentDate?: string | null;
  bankName?: string | null;
  upiId?: string | null;
  phoneNumber?: string | null;
  description: string;
  hoursElapsed?: number | null;
}): FraudAnalysisResult {
  const { fraudType, amountLost, transactionMethod, hoursElapsed } = input;

  const severityLevel: SeverityLevel = FRAUD_SEVERITY_MAP[fraudType] ?? "MEDIUM";
  const riskIndicators = FRAUD_RISK_INDICATORS[fraudType] ?? [
    "Fraudulent transaction may have occurred",
    "Personal information may have been compromised",
    "Linked accounts may be at risk",
    "Immediate action required to prevent further loss",
  ];

  const recoveryProbability = calculateRecoveryProbability(hoursElapsed, fraudType, transactionMethod);
  const emergencyActions = FRAUD_EMERGENCY_ACTIONS[fraudType] ?? getDefaultEmergencyActions(fraudType);
  const timelineRoadmap = getTimelineRoadmap(fraudType);

  const preventionAdvice = [
    "Never share OTPs, passwords, or PINs with anyone, including bank officials",
    "Verify the sender's identity before making any payment",
    "Use official apps and websites only — check URLs carefully",
    "Enable transaction alerts and set spending limits on all accounts",
    "Regularly review your bank statements for unauthorized transactions",
    "Register on the DND registry to reduce unsolicited calls",
  ];

  const warnings: string[] = [];
  if (hoursElapsed && hoursElapsed > 48) {
    warnings.push("Critical: More than 48 hours have passed — fund recovery probability decreases significantly with time");
  }
  if (amountLost && amountLost > 100000) {
    warnings.push("High value fraud: Escalate to senior cybercrime officials and consider engaging a cybercrime attorney");
  }
  if (fraudType === "Investment Scam" || fraudType === "KYC Fraud") {
    warnings.push("Identity theft risk: Monitor your credit report and CIBIL score for unauthorized loans or accounts");
  }
  if (severityLevel === "CRITICAL") {
    warnings.push("CRITICAL SEVERITY: Do not negotiate with fraudsters — every delay reduces recovery chances");
  }

  const aiGuidance = `Based on the reported ${fraudType} incident, this case has been classified as ${severityLevel} severity. ${
    recoveryProbability > 60
      ? `The recovery probability of ${recoveryProbability}% is relatively favorable — immediate action is critical to maximize chances.`
      : `With a ${recoveryProbability}% recovery probability, swift action and proper documentation are essential.`
  } The most critical step right now is to call 1930 and file a cybercrime complaint within the next hour. ${
    amountLost && amountLost > 50000
      ? "Given the significant amount involved, also consider filing a formal FIR at your local police station and consulting a cybercrime attorney."
      : "Document all evidence carefully as it will be required for the complaint process."
  }`;

  return {
    fraudClassification: fraudType,
    severityLevel,
    riskIndicators,
    recoveryProbability,
    emergencyActions,
    timelineRoadmap,
    preventionAdvice,
    warnings,
    aiGuidance,
  };
}
