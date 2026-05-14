export type DocumentCategory = "FINANCIAL" | "DIGITAL" | "IDENTITY" | "COMMUNICATION" | "LEGAL";

export interface ChecklistItem {
  id: string;
  title: string;
  description: string;
  required: boolean;
  category: DocumentCategory;
  tips?: string | null;
}

export interface DocumentChecklistResult {
  fraudType: string;
  checklist: ChecklistItem[];
  priorityDocuments: string[];
  additionalNotes: string;
}

const FRAUD_CHECKLISTS: Record<string, ChecklistItem[]> = {
  "UPI Fraud": [
    { id: "upi-1", title: "UTR / Transaction Reference Number", description: "The unique transaction reference number (12-digit UTR) from the fraudulent transfer", required: true, category: "FINANCIAL", tips: "Find in your UPI app under transaction history" },
    { id: "upi-2", title: "Bank Statement (Last 3 Months)", description: "Official bank statement showing the fraudulent transaction highlighted", required: true, category: "FINANCIAL", tips: "Download as PDF from net banking or request from branch" },
    { id: "upi-3", title: "Screenshot of UPI Transaction", description: "Screenshot of the fraudulent UPI payment from your UPI app", required: true, category: "DIGITAL", tips: "Include transaction status, amount, and recipient UPI ID" },
    { id: "upi-4", title: "Fraudster's UPI ID / Phone Number", description: "The UPI ID or mobile number the money was sent to", required: true, category: "DIGITAL" },
    { id: "upi-5", title: "Chat / Call Records with Fraudster", description: "All WhatsApp messages, SMS, or call logs from the fraudster", required: true, category: "COMMUNICATION", tips: "Export chat as .txt file from WhatsApp" },
    { id: "upi-6", title: "Complaint Acknowledgment (1930)", description: "Reference number received after calling 1930 helpline", required: true, category: "LEGAL" },
    { id: "upi-7", title: "Aadhaar / PAN Copy", description: "Your identity proof for filing FIR and cybercrime complaint", required: true, category: "IDENTITY" },
    { id: "upi-8", title: "Written Complaint to Bank", description: "Formal written complaint submitted to your bank's fraud department", required: false, category: "LEGAL", tips: "Use the complaint generator to create a professional draft" },
  ],
  "OTP Fraud": [
    { id: "otp-1", title: "Call Records Showing Fraudster's Number", description: "Phone call logs from the number that called and extracted your OTP", required: true, category: "COMMUNICATION" },
    { id: "otp-2", title: "SMS Screenshot Showing OTP Request", description: "Screenshot of the OTP SMS and the fraudulent transaction SMS", required: true, category: "DIGITAL" },
    { id: "otp-3", title: "Bank Transaction Records", description: "Bank statement or transaction history showing unauthorized debit", required: true, category: "FINANCIAL" },
    { id: "otp-4", title: "UTR Number of Fraudulent Transaction", description: "Unique transaction reference for all unauthorized transactions", required: true, category: "FINANCIAL" },
    { id: "otp-5", title: "Screenshot of Unauthorized Transaction Alert", description: "SMS or app notification of the unauthorized debit", required: true, category: "DIGITAL" },
    { id: "otp-6", title: "Identity Proof (Aadhaar/PAN)", description: "Your government ID for all complaints", required: true, category: "IDENTITY" },
    { id: "otp-7", title: "Written Timeline of Events", description: "Chronological account of how the fraud occurred with timestamps", required: false, category: "LEGAL" },
  ],
  "Phishing": [
    { id: "ph-1", title: "Screenshot of Phishing Website / Email", description: "Screenshot of the fraudulent website or phishing email you received", required: true, category: "DIGITAL", tips: "Include the full URL visible in the browser address bar" },
    { id: "ph-2", title: "Phishing Email with Full Headers", description: "Forward the phishing email to your security team with full email headers", required: true, category: "DIGITAL", tips: "In Gmail: More > Show original to see full headers" },
    { id: "ph-3", title: "List of Compromised Accounts", description: "List of all accounts where you used the same credentials", required: true, category: "DIGITAL" },
    { id: "ph-4", title: "Bank Statements for Unauthorized Charges", description: "Bank/card statements showing any unauthorized transactions", required: true, category: "FINANCIAL" },
    { id: "ph-5", title: "Antivirus Scan Report", description: "Report from antivirus software confirming or denying malware presence", required: false, category: "DIGITAL" },
    { id: "ph-6", title: "Identity Proof", description: "Your government ID for complaint filing", required: true, category: "IDENTITY" },
  ],
  "Investment Scam": [
    { id: "inv-1", title: "All Payment Receipts and Confirmations", description: "Every payment confirmation, deposit receipt, and transaction record", required: true, category: "FINANCIAL", tips: "Include all payments made even if they showed initial 'returns'" },
    { id: "inv-2", title: "Fraudulent Platform Screenshots", description: "Screenshots of the fake investment platform, including your 'balance' and withdrawal failures", required: true, category: "DIGITAL" },
    { id: "inv-3", title: "All Communication Records", description: "WhatsApp, Telegram, email correspondence with the fraudsters", required: true, category: "COMMUNICATION" },
    { id: "inv-4", title: "Fraudster Contact Information", description: "All phone numbers, email IDs, usernames, and social media profiles of fraudsters", required: true, category: "DIGITAL" },
    { id: "inv-5", title: "Investment Agreement / Contract", description: "Any agreement, MOU, or contract signed with the fraudulent platform", required: false, category: "LEGAL" },
    { id: "inv-6", title: "Bank Statements (Full Duration)", description: "Bank statements covering the entire period of your investment", required: true, category: "FINANCIAL" },
    { id: "inv-7", title: "Recruitment / Marketing Material", description: "Any promotional material, YouTube videos, or websites used to lure you", required: false, category: "DIGITAL" },
    { id: "inv-8", title: "Identity Proof and Address Proof", description: "Government ID and address proof for all complaints", required: true, category: "IDENTITY" },
  ],
  "Social Media Hack": [
    { id: "smh-1", title: "Hacked Account Username / URL", description: "The username and URL of the hacked social media account", required: true, category: "DIGITAL" },
    { id: "smh-2", title: "Last Successful Login Device Details", description: "Device type, OS, browser, and location of your last legitimate login", required: true, category: "DIGITAL", tips: "Check account security settings for login history" },
    { id: "smh-3", title: "Email Address Linked to Account", description: "The email address associated with the compromised account", required: true, category: "IDENTITY" },
    { id: "smh-4", title: "Suspicious Login Notifications", description: "Screenshots of security alerts or login notifications you received", required: true, category: "DIGITAL" },
    { id: "smh-5", title: "Evidence of Misuse", description: "Screenshots of fraudulent messages, posts, or financial requests made from your hacked account", required: true, category: "DIGITAL" },
    { id: "smh-6", title: "Recovery Email / Phone Records", description: "Evidence that account recovery options were changed by the hacker", required: false, category: "DIGITAL" },
    { id: "smh-7", title: "Identity Proof", description: "Government ID for platform verification and complaint filing", required: true, category: "IDENTITY" },
  ],
  "Credit/Debit Card Fraud": [
    { id: "cdf-1", title: "Credit/Debit Card Statement", description: "Card statement showing all unauthorized transactions highlighted", required: true, category: "FINANCIAL" },
    { id: "cdf-2", title: "Transaction SMS Alerts", description: "Screenshots of SMS transaction alerts for unauthorized charges", required: true, category: "DIGITAL" },
    { id: "cdf-3", title: "Merchant Details of Unauthorized Charges", description: "Merchant name, amount, and date of each fraudulent transaction", required: true, category: "FINANCIAL" },
    { id: "cdf-4", title: "Dispute Form from Bank", description: "Completed chargeback/dispute form from your issuing bank", required: true, category: "LEGAL", tips: "Request immediately — most banks have a 30-day dispute window" },
    { id: "cdf-5", title: "Proof You Were Not Present", description: "Evidence proving you did not make these purchases (travel records, receipts, etc.)", required: false, category: "LEGAL" },
    { id: "cdf-6", title: "Card Details and Last 4 Digits", description: "Card type, last 4 digits, and issuing bank for complaint records", required: true, category: "FINANCIAL" },
    { id: "cdf-7", title: "Identity Proof", description: "Government ID for complaint filing", required: true, category: "IDENTITY" },
  ],
  "KYC Fraud": [
    { id: "kyc-1", title: "All KYC Documents Shared", description: "Copies of all documents you submitted — Aadhaar, PAN, Passport, etc.", required: true, category: "IDENTITY" },
    { id: "kyc-2", title: "Communication with Fraudster", description: "All messages from the fraudster claiming to be from bank/telecom/govt", required: true, category: "COMMUNICATION" },
    { id: "kyc-3", title: "CIBIL Credit Report", description: "Latest credit report to check for unauthorized loans or accounts", required: true, category: "FINANCIAL", tips: "Get free report from cibil.com or equifax.in" },
    { id: "kyc-4", title: "Bank Account Activity Review", description: "Statement showing any suspicious transactions or new accounts", required: true, category: "FINANCIAL" },
    { id: "kyc-5", title: "Aadhaar Lock Confirmation", description: "Confirmation that you have locked your Aadhaar biometrics on UIDAI", required: false, category: "IDENTITY", tips: "Lock at myaadhaar.uidai.gov.in immediately" },
    { id: "kyc-6", title: "Police Complaint Acknowledgment", description: "FIR copy for use in disputing fraudulent accounts or loans", required: true, category: "LEGAL" },
  ],
};

function getDefaultChecklist(fraudType: string): ChecklistItem[] {
  return [
    { id: "gen-1", title: "Fraud Incident Description (Written)", description: "Detailed written account of how the fraud occurred, with dates and timestamps", required: true, category: "LEGAL" },
    { id: "gen-2", title: "Communication Records with Fraudster", description: "All messages, emails, and call logs from the fraudster", required: true, category: "COMMUNICATION" },
    { id: "gen-3", title: "Financial Transaction Records", description: "Bank statements or receipts showing any payments made", required: true, category: "FINANCIAL" },
    { id: "gen-4", title: "Screenshots of Fraudulent Activity", description: "Screenshots of websites, apps, or messages used in the fraud", required: true, category: "DIGITAL" },
    { id: "gen-5", title: "Fraudster Contact Information", description: "All phone numbers, email IDs, and social media profiles", required: true, category: "DIGITAL" },
    { id: "gen-6", title: "Identity Proof (Aadhaar / PAN)", description: "Government-issued ID for all complaint registrations", required: true, category: "IDENTITY" },
    { id: "gen-7", title: "Cybercrime Helpline Reference Number", description: "Reference number from 1930 helpline or cybercrime.gov.in portal", required: true, category: "LEGAL" },
  ];
}

export function getDocumentChecklist(input: {
  fraudType: string;
  transactionMethod?: string | null;
}): DocumentChecklistResult {
  const { fraudType } = input;
  const checklist = FRAUD_CHECKLISTS[fraudType] ?? getDefaultChecklist(fraudType);

  const priorityDocuments = checklist
    .filter((item) => item.required)
    .slice(0, 3)
    .map((item) => item.title);

  const additionalNotes =
    fraudType === "Investment Scam"
      ? "For investment scams, also report to SEBI at scores.sebi.gov.in and to RBI at cms.rbi.org.in. Keep records of all 'profit' screenshots shown by fraudsters."
      : fraudType === "KYC Fraud"
        ? "Immediately lock your Aadhaar at myaadhaar.uidai.gov.in and request your bank to add an alert flag on your account. Check all linked mobile numbers."
        : "Ensure all documents are organized chronologically. The cybercrime cell may request original documents — keep physical copies safe.";

  return { fraudType, checklist, priorityDocuments, additionalNotes };
}
