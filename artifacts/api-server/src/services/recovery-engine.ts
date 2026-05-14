export type UrgencyLevel = "CRITICAL" | "HIGH" | "MEDIUM" | "LOW";
export type ImpactType = "POSITIVE" | "NEGATIVE" | "NEUTRAL";

export interface RecoveryFactor {
  factor: string;
  impact: ImpactType;
  description: string;
}

export interface RecoveryResult {
  probability: number;
  urgencyLevel: UrgencyLevel;
  explanation: string;
  factors: RecoveryFactor[];
  recommendations: string[];
}

export function estimateRecovery(input: {
  fraudType: string;
  hoursElapsed: number;
  paymentMethod: string;
  amountLost?: number | null;
  reportedToBank?: boolean;
  reportedToPolice?: boolean;
}): RecoveryResult {
  const { fraudType, hoursElapsed, paymentMethod, amountLost, reportedToBank, reportedToPolice } = input;

  let probability = 50;
  const factors: RecoveryFactor[] = [];

  // Time factor
  if (hoursElapsed < 1) {
    probability += 35;
    factors.push({ factor: "Reported within 1 hour", impact: "POSITIVE", description: "Extremely fast reporting significantly increases bank reversal chances" });
  } else if (hoursElapsed < 6) {
    probability += 25;
    factors.push({ factor: "Reported within 6 hours", impact: "POSITIVE", description: "Quick reporting improves odds of transaction freeze and reversal" });
  } else if (hoursElapsed < 24) {
    probability += 10;
    factors.push({ factor: "Reported within 24 hours", impact: "POSITIVE", description: "Within the critical window — bank investigation is more likely to succeed" });
  } else if (hoursElapsed < 72) {
    factors.push({ factor: "Reported within 72 hours", impact: "NEUTRAL", description: "Moderate delay — recovery is possible but requires strong evidence" });
  } else if (hoursElapsed < 168) {
    probability -= 15;
    factors.push({ factor: "Delayed by over 3 days", impact: "NEGATIVE", description: "Significant delay reduces chance of transaction reversal" });
  } else {
    probability -= 30;
    factors.push({ factor: "Critical delay — over 7 days", impact: "NEGATIVE", description: "Funds likely transferred multiple times — recovery is very difficult" });
  }

  // Payment method factor
  if (paymentMethod === "Credit Card") {
    probability += 20;
    factors.push({ factor: "Credit Card Payment", impact: "POSITIVE", description: "Credit card chargebacks are well-established — banks are more likely to reverse charges" });
  } else if (paymentMethod === "Debit Card") {
    probability += 10;
    factors.push({ factor: "Debit Card Payment", impact: "POSITIVE", description: "Debit card disputes have moderate success rates with timely reporting" });
  } else if (paymentMethod === "UPI") {
    probability += 8;
    factors.push({ factor: "UPI Payment", impact: "POSITIVE", description: "UPI transactions are traceable — NPCI guidelines support victim protection" });
  } else if (paymentMethod === "Net Banking") {
    probability += 5;
    factors.push({ factor: "Net Banking Transfer", impact: "NEUTRAL", description: "Bank-to-bank transfers have moderate recovery rates with proper documentation" });
  } else if (paymentMethod === "Cryptocurrency") {
    probability -= 30;
    factors.push({ factor: "Cryptocurrency Payment", impact: "NEGATIVE", description: "Crypto transactions are irreversible — recovery is extremely unlikely" });
  } else if (paymentMethod === "Wallet") {
    probability -= 5;
    factors.push({ factor: "Wallet Payment", impact: "NEUTRAL", description: "Wallet refunds depend on provider's fraud policy — moderate recovery chance" });
  }

  // Fraud type factor
  const highRecoveryFrauds = ["UPI Fraud", "Credit/Debit Card Fraud", "OTP Fraud"];
  const lowRecoveryFrauds = ["Investment Scam", "Romance Scam", "Lottery Scam"];
  if (highRecoveryFrauds.includes(fraudType)) {
    probability += 10;
    factors.push({ factor: `${fraudType} — Higher Recovery Category`, impact: "POSITIVE", description: "This fraud type has established recovery mechanisms and regulatory guidelines" });
  } else if (lowRecoveryFrauds.includes(fraudType)) {
    probability -= 15;
    factors.push({ factor: `${fraudType} — Lower Recovery Category`, impact: "NEGATIVE", description: "This fraud type typically involves voluntary transfers which complicates recovery" });
  }

  // Reporting factor
  if (reportedToBank) {
    probability += 10;
    factors.push({ factor: "Bank Already Notified", impact: "POSITIVE", description: "Bank notification triggers internal fraud investigation and potential account freeze" });
  } else {
    probability -= 10;
    factors.push({ factor: "Bank Not Yet Notified", impact: "NEGATIVE", description: "Bank notification is critical — contact your bank immediately" });
  }

  if (reportedToPolice) {
    probability += 5;
    factors.push({ factor: "Police Complaint Filed", impact: "POSITIVE", description: "FIR strengthens your case for bank recovery and legal proceedings" });
  }

  // Amount factor
  if (amountLost && amountLost > 500000) {
    probability -= 10;
    factors.push({ factor: "High Value Transaction", impact: "NEGATIVE", description: "Large sums are often quickly dispersed across multiple accounts making recovery harder" });
  } else if (amountLost && amountLost < 10000) {
    probability += 5;
    factors.push({ factor: "Lower Amount Transaction", impact: "POSITIVE", description: "Smaller amounts are easier to reverse within banking systems" });
  }

  probability = Math.min(95, Math.max(5, probability));

  let urgencyLevel: UrgencyLevel;
  if (hoursElapsed < 6) urgencyLevel = "CRITICAL";
  else if (hoursElapsed < 24) urgencyLevel = "HIGH";
  else if (hoursElapsed < 72) urgencyLevel = "MEDIUM";
  else urgencyLevel = "LOW";

  const explanation = `Based on the ${fraudType} incident reported after ${hoursElapsed} hours via ${paymentMethod}, the estimated recovery probability is ${probability}%. ${
    probability > 70
      ? "You have a strong chance of recovery if you act immediately."
      : probability > 40
        ? "Recovery is possible but requires swift action and proper documentation."
        : "Recovery is challenging but not impossible — legal and regulatory channels may still help."
  }`;

  const recommendations = [
    !reportedToBank ? "Contact your bank's fraud hotline immediately — this is the most critical step" : "Follow up with your bank's fraud investigation team for a status update",
    !reportedToPolice ? "File an FIR at your local police station with all evidence" : "Obtain a certified copy of your FIR for use in bank and cybercrime complaints",
    "File a complaint at cybercrime.gov.in with reference number 1930",
    "Document all communication, transaction IDs, and evidence meticulously",
    hoursElapsed < 24 ? "Request your bank to freeze the beneficiary account immediately" : "Request your bank to trace the transaction chain even if reversal is uncertain",
    "Monitor your credit report for unauthorized accounts or loans in your name",
  ];

  return { probability, urgencyLevel, explanation, factors, recommendations };
}
