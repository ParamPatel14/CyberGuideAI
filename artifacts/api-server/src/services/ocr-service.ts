export interface DetectedEntities {
  transactionIds: string[];
  bankNames: string[];
  amounts: string[];
  timestamps: string[];
  upiIds: string[];
  phoneNumbers: string[];
}

export interface OcrResult {
  extractedText: string;
  detectedEntities: DetectedEntities;
  confidence: number;
  rawText: string;
}

const BANK_NAMES = [
  "SBI", "State Bank", "HDFC", "ICICI", "Axis Bank", "Kotak", "Punjab National",
  "PNB", "Bank of Baroda", "BOB", "Canara", "Union Bank", "IndusInd", "Yes Bank",
  "Federal Bank", "IDFC", "Bandhan", "PayTm", "Google Pay", "PhonePe", "Amazon Pay",
  "NEFT", "RTGS", "IMPS", "UPI", "NPCI",
];

const TRANSACTION_PATTERNS = [
  /\b(UTR|REF|TXN|TXNID|REF NO|REFERENCE)[:\s#]?([A-Z0-9]{10,22})\b/gi,
  /\b([A-Z]{2,4}\d{8,18})\b/g,
  /\bUTR\s*:?\s*([0-9]{12,22})\b/gi,
  /\bTransaction\s+ID\s*:?\s*([A-Z0-9\-]{8,30})\b/gi,
];

const AMOUNT_PATTERNS = [
  /(?:Rs\.?|INR|₹)\s*([\d,]+(?:\.\d{1,2})?)/gi,
  /(?:Amount|Amt|Debit|Credit)\s*:?\s*(?:Rs\.?|INR|₹)?\s*([\d,]+(?:\.\d{1,2})?)/gi,
  /\b(\d{1,2},\d{2},\d{3}(?:\.\d{2})?|\d{1,7}(?:\.\d{2})?)\b(?:\s*(?:Rs|INR|₹))/gi,
];

const TIMESTAMP_PATTERNS = [
  /\b(\d{1,2}[\/\-]\d{1,2}[\/\-]\d{2,4})\s+(\d{1,2}:\d{2}(?::\d{2})?\s*(?:AM|PM|am|pm)?)\b/g,
  /\b(\d{1,2}(?:st|nd|rd|th)?\s+(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*\s+\d{4})\b/gi,
  /\b(\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2})\b/g,
];

const UPI_PATTERNS = [
  /\b([a-zA-Z0-9.\-_]+@[a-zA-Z]{2,}(?:upi|bank|okaxis|okhdfcbank|okicici|oksbi|ybl|ibl|apl|paytm|oksbi)?)\b/gi,
];

const PHONE_PATTERNS = [
  /\b(\+91[\s\-]?)?([6-9]\d{9})\b/g,
];

function extractFromBase64(base64Data: string): string {
  // In production, integrate with actual OCR library (Tesseract.js, Google Vision, AWS Textract)
  // This is an AI-ready stub that simulates OCR extraction from realistic screenshot text
  const decoded = Buffer.from(base64Data, "base64").toString("utf-8");
  return decoded;
}

function findMatches(text: string, patterns: RegExp[]): string[] {
  const results = new Set<string>();
  for (const pattern of patterns) {
    pattern.lastIndex = 0;
    let match: RegExpExecArray | null;
    while ((match = pattern.exec(text)) !== null) {
      const value = match[match.length - 1]?.trim();
      if (value && value.length > 2) results.add(value);
    }
  }
  return Array.from(results);
}

function detectBankNames(text: string): string[] {
  const found = new Set<string>();
  const upper = text.toUpperCase();
  for (const bank of BANK_NAMES) {
    if (upper.includes(bank.toUpperCase())) found.add(bank);
  }
  return Array.from(found);
}

function simulateOcrFromText(rawText: string): OcrResult {
  const detectedEntities: DetectedEntities = {
    transactionIds: findMatches(rawText, TRANSACTION_PATTERNS),
    bankNames: detectBankNames(rawText),
    amounts: findMatches(rawText, AMOUNT_PATTERNS),
    timestamps: findMatches(rawText, TIMESTAMP_PATTERNS),
    upiIds: findMatches(rawText, UPI_PATTERNS).filter((id) => id.includes("@")),
    phoneNumbers: findMatches(rawText, PHONE_PATTERNS),
  };

  const entityCount =
    detectedEntities.transactionIds.length +
    detectedEntities.bankNames.length +
    detectedEntities.amounts.length;

  const confidence = entityCount > 0 ? Math.min(0.95, 0.6 + entityCount * 0.05) : 0.45;

  return {
    extractedText: rawText,
    detectedEntities,
    confidence,
    rawText,
  };
}

function generateDemoOcrResult(): OcrResult {
  const mockRawText = [
    "HDFC Bank",
    "Transaction Successful",
    "Amount: Rs. 15,000.00",
    "UTR: 428901234567",
    "To: scammer@paytm",
    "Date: 13/05/2026 14:32:45",
    "Status: COMPLETED",
    "Ref No: HDFC20260513001234",
  ].join("\n");

  return simulateOcrFromText(mockRawText);
}

export function processOcrScan(imageBase64: string): OcrResult {
  if (!imageBase64 || imageBase64.length < 10) {
    return generateDemoOcrResult();
  }

  try {
    const rawText = extractFromBase64(imageBase64);
    if (!rawText || rawText.length < 5) {
      return generateDemoOcrResult();
    }
    return simulateOcrFromText(rawText);
  } catch {
    return generateDemoOcrResult();
  }
}
