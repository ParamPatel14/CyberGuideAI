export interface Helpline {
  name: string;
  number: string;
  availability: string;
  description: string;
}

export interface ActionStep {
  order: number;
  title: string;
  description: string;
  urgency: "IMMEDIATE" | "HIGH" | "MEDIUM" | "LOW";
  helpline?: string | null;
}

export interface GuidanceResult {
  emergencySteps: ActionStep[];
  helplines: Helpline[];
  nextSteps: string[];
  importantWarnings: string[];
}

const HELPLINES: Helpline[] = [
  {
    name: "National Cybercrime Helpline",
    number: "1930",
    availability: "24x7",
    description: "Primary helpline for reporting all types of cybercrime. Call immediately — the faster you report, the higher the chance of transaction reversal.",
  },
  {
    name: "National Cybercrime Reporting Portal",
    number: "cybercrime.gov.in",
    availability: "24x7 Online",
    description: "File detailed online complaints with evidence uploads. Mandatory for all cybercrime victims for legal proceedings.",
  },
  {
    name: "RBI Banking Ombudsman",
    number: "14440",
    availability: "Mon-Fri, 9AM-5PM",
    description: "For complaints against banks regarding unauthorized transactions and inadequate fraud resolution.",
  },
  {
    name: "NPCI UPI Dispute Helpline",
    number: "1800-120-1740",
    availability: "9AM-6PM",
    description: "For disputes related to UPI transactions, payment failures, and unauthorized UPI transfers.",
  },
  {
    name: "SEBI Investor Helpline",
    number: "1800-266-7575",
    availability: "Mon-Sat, 9AM-6PM",
    description: "For investment scams, fake trading platforms, and fraudulent securities transactions.",
  },
  {
    name: "Women's Helpline (Cyber Safety)",
    number: "181",
    availability: "24x7",
    description: "Dedicated support for women victims of cyber fraud, romance scams, and online harassment.",
  },
];

const FRAUD_SPECIFIC_STEPS: Record<string, ActionStep[]> = {
  "UPI Fraud": [
    { order: 1, title: "Call 1930 Within the Hour", description: "Call the National Cybercrime Helpline immediately. Provide the UTR number, fraudster's UPI ID, and transaction details. Request an urgent transaction hold.", urgency: "IMMEDIATE", helpline: "1930" },
    { order: 2, title: "Call Your Bank's Fraud Hotline", description: "Contact your bank immediately to request a freeze on the beneficiary account. Ask for the complaint reference number in writing.", urgency: "IMMEDIATE", helpline: null },
    { order: 3, title: "Block Your UPI and Change MPIN", description: "Open your UPI app, block the affected UPI ID, and change your MPIN immediately from a secure device.", urgency: "IMMEDIATE", helpline: null },
    { order: 4, title: "File Cybercrime Portal Complaint", description: "Visit cybercrime.gov.in and register a detailed complaint with transaction ID, screenshots, and fraudster's UPI ID.", urgency: "HIGH", helpline: null },
    { order: 5, title: "File FIR at Cybercrime Police Station", description: "Take printed copies of all evidence and file an FIR at your nearest cybercrime police station.", urgency: "HIGH", helpline: null },
  ],
  "Investment Scam": [
    { order: 1, title: "Stop All Further Payments Immediately", description: "Do not transfer any more money, regardless of threats or promises of higher returns. Cut all contact with the fraudsters.", urgency: "IMMEDIATE", helpline: null },
    { order: 2, title: "Report to SEBI and 1930", description: "Call 1930 and also file a complaint at scores.sebi.gov.in for investment-related fraud. Provide the fraudulent platform's name and all payment details.", urgency: "IMMEDIATE", helpline: "1930" },
    { order: 3, title: "Preserve All Digital Evidence", description: "Screenshot the fraudulent trading platform, all chat conversations, payment receipts, and the fraudster's contact information before they disappear.", urgency: "IMMEDIATE", helpline: null },
    { order: 4, title: "Request Bank Chargeback", description: "Contact your bank to initiate chargeback for any card payments. For UPI transfers, request the beneficiary account freeze.", urgency: "HIGH", helpline: null },
    { order: 5, title: "Engage a Cybercrime Lawyer", description: "Given the typically high amounts involved in investment scams, consult a cybercrime attorney about civil recovery options.", urgency: "MEDIUM", helpline: null },
  ],
  "Phishing": [
    { order: 1, title: "Change All Passwords Immediately", description: "Change passwords for the compromised account and all accounts with the same password. Do this from a different, clean device.", urgency: "IMMEDIATE", helpline: null },
    { order: 2, title: "Enable 2FA on All Critical Accounts", description: "Activate two-factor authentication on your banking, email, and social media accounts using an authenticator app.", urgency: "IMMEDIATE", helpline: null },
    { order: 3, title: "Notify Your Bank", description: "Alert your bank about the phishing attack. Request monitoring of your account for 30 days and update your net banking credentials.", urgency: "IMMEDIATE", helpline: null },
    { order: 4, title: "Report the Phishing Website", description: "Report the phishing URL to Google Safe Browsing at safebrowsing.google.com and to cybercrime.gov.in.", urgency: "HIGH", helpline: null },
    { order: 5, title: "Scan All Devices for Malware", description: "Run comprehensive antivirus scans on all devices you used to access the phishing site.", urgency: "HIGH", helpline: null },
  ],
};

function getDefaultSteps(fraudType: string): ActionStep[] {
  return [
    { order: 1, title: "Call National Cybercrime Helpline (1930)", description: `Call 1930 immediately to report the ${fraudType}. Note your complaint reference number — it's required for all subsequent complaints.`, urgency: "IMMEDIATE", helpline: "1930" },
    { order: 2, title: "Preserve All Evidence", description: "Screenshot all messages, emails, transaction records, and any profile of the fraudster before they can be deleted.", urgency: "IMMEDIATE", helpline: null },
    { order: 3, title: "Notify Your Financial Institution", description: "Contact your bank, wallet, or payment provider to report the fraud and request the beneficiary account be frozen.", urgency: "IMMEDIATE", helpline: null },
    { order: 4, title: "File Complaint at cybercrime.gov.in", description: "Register an online complaint with all available evidence. You will receive an acknowledgment and case number.", urgency: "HIGH", helpline: null },
    { order: 5, title: "File FIR at Local Police Station", description: "Visit your nearest police station with printed evidence copies to file a First Information Report.", urgency: "HIGH", helpline: null },
  ];
}

export function getGuidance(input: {
  fraudType: string;
  amountLost?: number | null;
  hoursElapsed?: number | null;
}): GuidanceResult {
  const { fraudType, amountLost, hoursElapsed } = input;

  const emergencySteps = FRAUD_SPECIFIC_STEPS[fraudType] ?? getDefaultSteps(fraudType);

  const nextSteps = [
    "Follow up with your bank's fraud investigation team every 3-5 business days",
    "Keep a dedicated folder with all evidence, complaint numbers, and correspondence",
    "Monitor your credit report at cibil.com for any unauthorized loans or accounts",
    "Register on the National Do Not Disturb (DND) registry to reduce scam calls",
    "Consider a credit freeze if identity documents were compromised",
    amountLost && amountLost > 100000
      ? "Consult a cybercrime attorney for civil recovery proceedings given the amount involved"
      : "Approach the Banking Ombudsman if your bank does not resolve the complaint within 30 days",
  ].filter(Boolean) as string[];

  const importantWarnings: string[] = [];

  if (hoursElapsed !== undefined && hoursElapsed !== null && hoursElapsed > 24) {
    importantWarnings.push("URGENT: More than 24 hours have passed — recovery probability drops significantly. File all complaints today.");
  }
  if (amountLost && amountLost > 500000) {
    importantWarnings.push("High-value fraud: Simultaneously approach the Adjudicating Officer under the IT Act and consider civil court injunction to freeze assets.");
  }
  importantWarnings.push("Never respond to anyone claiming they can 'recover your money for a fee' — this is a secondary scam targeting fraud victims.");
  importantWarnings.push("Do not negotiate or engage further with the original fraudsters under any circumstances.");

  return { emergencySteps, helplines: HELPLINES, nextSteps, importantWarnings };
}
